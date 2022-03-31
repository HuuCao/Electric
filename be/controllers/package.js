const { packageVal } = require("../refun/validate");
const { validate, findEleDB } = require("../refun/until");
const { createPackage, getAllPackage, updatePackage } = require("../services/package");;
const client = require("../config/mongodb");
const moment = require('moment');

module.exports.createPackage = async (req, res, next) => {
    try {
        var valPackage = validate(req.body, packageVal);

        if (valPackage == false) {
            res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
        }
        req.valPackage = valPackage;
        req.valPackage.createAt = moment().format();
        req.valPackage.is_active = true
        await createPackage (req, res, next);
    }
    catch (e) {
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.getAllPackage = async (req, res, next) => {
    try {
        getAllPackage(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.updatePackage = async (req, res, next) => {
    try {
        updatePackage(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
};
  