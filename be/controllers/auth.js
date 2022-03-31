const {
  register,
  login,
  forgotPass,
  changepass,
  verifyotp,
  active,
  // getProfile
} = require('../services/auth')

const {
  loginVal,
  registerVal,
  verifyVal,
  forgotpassVal
} = require('../refun/validate');

const bcrypt = require('../config/bcrypt')
const { verify, sign, signRefresh } = require('../config/jwt');
const { validate, findEleDB } = require("../refun/until");
const { compare, hash } = require("../config/crypto");
const client = require('../config/mongodb');
const { Db, Int32 } = require('mongodb');
const moment = require('moment');

//==================== register =======================//

module.exports.register = async (req, res, next) => {
  try {
    //validate data body
    var valUser = validate(req.body, registerVal);
    if (valUser == false) {
      return res.status(401).send({ success: false, mess: "Validate wrong!" }); 
    }//throw: ném lỗi --> đều dừng hàm tương tự return

    var checkMail = await client.db(process.env.DB).collection("user").findOne({ email: req.body.email })
    if(checkMail != null) {
        return res.send({ success: false, mess: "Email da ton tai!" })
    }

    var checkTel = await client.db(process.env.DB).collection("user").findOne({ email: req.body.tel })
    if(checkTel != null) {
        return res.send({ success: false, mess: "Tel da ton tai!" })
    }

    valUser.password = await hash(valUser.password);
    valUser.createdAt = moment().format();
    valUser.role = "customer";
    valUser.packageId = 1;
    valUser.registerDate = moment().format();
    valUser.expiry =  moment().add(100, 'year').format('YYYY-MM-DD');
    valUser.is_active = true;

    req.valUser = valUser;
    // console.log(JSON.stringify(req.valUser));
    //đang kiểm tra thử xem valUser là gì
    //nó có khác so với body truyền lên hay k
    //valUser được xử lý ở dòng 99 là = với body truyền lên
    //và được băm password tại dòng 109
    await register(req, res, next);
  } catch (e) {
    next(new Error(`502:${e}`));
  }
};

//==================== Login =======================//

module.exports.login = async (req, res, next) => {
  try {
    var body = req.body;

    var data = validate(body, loginVal); //data trả vể giá trị của mail và password
    var user = await findEleDB(
      client,
      process.env.DB,
      "user",
      "email",
      body.email
    );
  
    if(data == false ){
      throw next(new Error(`502:${"Validate data wrong !"}`));
    }
    if(user == null){
      res.send({ success: false, mess: "Mail không đúng" });
    }

    if (user != null) {
      var valPass = await bcrypt.compare(body.password, user.password);

      if(user.email == null || valPass == false){
        res.send({ success: false, mess: "Mail and Password not match!" })
      }

      if(user.is_active != true) {
        res.send({ success: false, mess: "Tài khoản đã bị xóa" });
      }

      req.user = user;
	    // req.user.permission = permissions;
      if (valPass == true) {
        await login(req, res, next);
      } else {
        throw next(new Error(`502:${"Password wrong !"}`));
      }
    } else {
      throw next(new Error(`404:${"Not found user ."}`));
    }
  }
  catch(err)
  {
    next(new Error(`502:${err}`));
  }
};

//==================== Forgot Password =======================//

module.exports.forgotPass = async (req, res, next) => {
  try {
    var body = validate(req.body, forgotpassVal);
    if (body == false) {
      throw next(new Error(`502:${"Validate data wrong !"}`));
    }
    var code = Math.floor(Math.random() * (999999- 100000)) + 100000;
    var user = await findEleDB(
      client,
      process.env.DB,
      "user",
      "email",
      body.email
    );
    if (user == null) {
      throw next(new Error(`404:${"Not found user ."}`));
    }
    req.user = user;
    req.user.code = code;
    await forgotPass(req, res, next);
  } catch (e) {
    next(new Error(`502:${e}`));
  }
};


//==================== verifyotp =======================//

module.exports.verifyotp = async (req, res, next) => {
  try {
    const val = validate(req.body, verifyVal);

    if (val == false) return res.send({ success: false, mess: "Valid wrong" });

    const response = await verifyotp(req, res, next);

    res.json(response);
  } catch (err) {
    throw new Error("Error: " + err);
  }
};

//==================== active =======================//

module.exports.active = async (req, res, next) => {
  try {
    const val = validate(req.body, verifyVal);

    if (val == false) return res.send({ success: false, mess: "Valid wrong" });

    const response = await active(req, res, next);

    res.json(response);
  } catch (err) {
    throw new Error("Error: " + err);
  }
};

//==================== changepass =======================//

module.exports.changepass = async (req, res, next) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    
    if (email == undefined) {
      res.send ({ success: false, mess: " Not found mail" });
    }
    
    if (password == undefined) {
      res.send({ success: false, mess: "Not found password" });
    }

    await changepass(req, res, next);
  } catch (err) {
    throw new Error("Error: " + err);
  }
};

// module.exports.getProfile = async (req, res, next) => {
//   try {
//     getProfile(req, res, next);
//   }
//   catch (e) {
//       return res.send({ success: false, mess: "Error:" + e });
//   }
// }