const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");
const _ = require("lodash");
const moment = require("moment");

module.exports.updateUser = async (req, res, next) => {
  try {
    client
      .db(process.env.DB)
      .collection("user")
      .updateOne(
        {
          idUser: parseInt(req.params.id),
        },
        {
          $set: {
            ...req.body,
          },
        }
      )
      .then((result) => {
        if (result.matchedCount > 0) {
          res.send({ success: true, data: req.body });
        } else {
          res.send({ success: false, mess: "Update Faile !" });
        }
      });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.updatePackage = async (req, res, next) => {
  try {
    var _package = await client
      .db(process.env.DB)
      .collection('package')
      .findOne({
        packageId: req.body.packageId
      })
    console.log(_package.dueDate);

    if(req.body.packageId == 1){
      var registerDate = moment().format();
      var expiry = moment().add(_package.dueDate, 'month').format('YYYY-MM-DD');
      await client
        .db(process.env.DB)
        .collection("user")
        .updateOne(
          {
            idUser: parseInt(req.params.id),
          },
          {
            $set: {
              ...req.body,
              registerDate: registerDate,
              expiry: expiry
            },
          }
        )
    }
    if(req.body.packageId == 2){
      var registerDate = moment().format();
      var expiry = moment().add(_package.dueDate, 'month').format('YYYY-MM-DD');
      await client
        .db(process.env.DB)
        .collection("user")
        .updateOne(
          {
            idUser: parseInt(req.params.id),
          },
          {
            $set: {
              ...req.body,
              registerDate: registerDate,
              expiry: expiry
            },
          }
        )
    }
    if(req.body.packageId == 3){
      var registerDate = moment().format();
      var expiry = moment().add(_package.dueDate, 'month').format('YYYY-MM-DD');
      await client
        .db(process.env.DB)
        .collection("user")
        .updateOne(
          {
            idUser: parseInt(req.params.id),
          },
          {
            $set: {
              ...req.body,
              registerDate: registerDate,
              expiry: expiry
            },
          }
        )
    }
    if(req.body.packageId == 4){
      var registerDate = moment().format();
      var expiry = moment().add(_package.dueDate, 'month').format('YYYY-MM-DD');
      await client
        .db(process.env.DB)
        .collection("user")
        .updateOne(
          {
            idUser: parseInt(req.params.id),
          },
          {
            $set: {
              ...req.body,
              registerDate: registerDate,
              expiry: expiry
            },
          }
        )
    }
    res.send({ success: true, mess: " Update Successfully!"});
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    var user = await client.db(process.env.DB).collection("user").findOne({
      idUser: req.user.idUser,
    });

    res.send({ success: true, data: user });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getUserByRole = async (req, res, next) => {
  try {
    var role = await client
      .db(process.env.DB)
      .collection("user")
      .find({
        role: req.query.role,
      })
      .toArray();

    res.send({ success: true, data: role });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    var _user = await client
      .db(process.env.DB)
      .collection("user")
      .find({})
      .toArray();
      await new Promise(async(resolve, reject) => {
        for(let i in _user){
          let package = await client
          .db(process.env.DB)
          .collection('package')
          .findOne({ packageId: parseInt(_user[i].packageId) })
          _user[i].packageId = package;
        }
        resolve();
      })

    if (req.query.tel != undefined) {
      _user = _.filter(_user, (o) => {
        if (o.tel == req.query.tel) return o;
      });
    }
    if (req.query.name != undefined) {
      _user = _.filter(_user, (o) => {
        if (o.name == undefined) o.name = "";
        if (
          new String(o.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            .toLocaleLowerCase()
            .includes(
              req.query.name
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        )
          return o;
      });
    }

    res.send({ success: true, data: _user });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};