const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");
const { sendMail } = require("../config/mail");
const moment = require('moment');
const nodemailer = require("nodemailer");
const _ = require("lodash");

require("dotenv").config();

//============== register ===============//

const register = async (req, res, next) => {
  // req.valUser.idUser =
  //   (await client.db(process.env.DB).collection("user").countDocuments()) + 1;

  req.valUser.idUser = await client
    .db(process.env.DB)
    .collection("user")
    .find({})
    .toArray();
  var max = _.sortBy(req.valUser.idUser, (o) => {
    return parseInt(o.idUser);
  });
  if (max != undefined && max.length != 0) {
    req.valUser.idUser = parseInt(max[max.length - 1].idUser) + 1;
  } else {
    req.valUser.idUser = 1;
  }
  
  await client
    .db(process.env.DB)
    .collection("user")
    .insert(req.valUser)
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" });
      }
    });
};

//============== login ===============//

const login = async (req, res, next) => {
  var accessToken = await sign(req.user);
  var refreshToken = await signRefresh(req.user);

  var user = await client
    .db(process.env.DB)
    .collection("user")
    .updateOne(
      {
        email: `${req.user.email}`,
      },
      {
        $set: { lastLogin: `${moment().format('YYYY-MM-DD')}` },
      },
      {
        upsert: false,
      }
    )
    .catch((e) => {
      throw next(new Error(`402:${e}`));
    });

  delete req.user.password;
  res.send({
    email: req.user.email,
    idUser: req.user.idUser ,
    accessToken,
    refreshToken,
  });
};

//============== Forgot Password ===============//

const forgotPass = async (req, res, next) => {
  await client
    .db(process.env.DB)
    .collection("user")
    .updateOne(
      {
        email: req.user.email,
      },
      {
        $set: { code: `${req.user.code}` },
      }
    )
    .catch((e) => {
      throw next(new Error(`402:${`Create recovery code fail !`}`));
    });
  await sendMail(
    req.user.email,
    "Forgot Password",
    `Mã OTP của bạn là: ${req.user.code}\nCreate by Electric .`
  ).catch((e) => {
    console.log(e);
    throw next(new Error(`402:${`Send mail fail !`}`));
  });
  res.send({
    status: true, mess: "Successfully!"
  });
};

//============== verifyotp ===============//

const verifyotp = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ email: req.body.email, code: req.body.code });

    if (!user) {
      res.send({ success: false, mess: "Mailcode Incorrect " });
    } else {
      res.send({ success: true, mess: "Successfully!" });
    }
  } catch (err) {
    next(err);
  }
};

//============== active ===============//

const active = async (req, res, next) => {
  try {
    var account = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ mail: req.body.mail });

    if (account.is_activate == false) {
      if (account.code == req.body.code) {
        console.log(account.code);

        await client.db(process.env.DB).collection("user").update(
          { mail: req.body.mail },
          {
            is_activate: true,
            code: "",
          }
        );

        return { success: true, mess: "Active Success!" };
      } else {
        return { success: false, mess: "Verify faile !" };
      }
    } else {
      return { success: false, mess: "Account Had Activated !" };
    }
  } catch (e) {
    return { success: false, mess: e };
  }
};

//============== changepass ===============//

const changepass = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ email: req.body.email });

    if (!user.email) {
      res.send({ success: false, mess: "Mail khong ton tai" });
    }

    req.body.password = bcrypt.hash(req.body.password);

    await client
      .db(process.env.DB)
      .collection("user")
      .updateOne(
        { password: user.password },
        { $set: { password: req.body.password } }
      );
    res.send({ success: true, mess: "Change password successfully!" });
  } catch (err) {
    next(err);
  }
};

// const getProfile = async (req, res, next) => {
//   try {
//     var user = await client
//       .db(process.env.DB)
//       .collection("user")
//       .findOne({
//         idUser: req.user.idUser,
//       });

//     res.send({ success: true, data: user });
//   } catch (e) {
//     return res.send({ success: false, mess: "Error: " + e });
//   }
// };

module.exports = {
  register,
  login,
  forgotPass,
  changepass,
  verifyotp,
  active,
  // getProfile,
};
