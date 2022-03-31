const { recipeVal } = require("../refun/validate");
const { validate, findEleDB } = require("../refun/until");
const { createRecipe, getAllRecipe, updateRecipe } = require("../services/recipe");;
const client = require("../config/mongodb");
const moment = require('moment');

module.exports.createRecipe = async (req, res, next) => {
    try {
        var valRecipe = validate(req.body, recipeVal);

        if (valRecipe == false) {
            res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
        }
        req.valRecipe = valRecipe;
        valRecipe.is_active = true;
        valRecipe.createAt = moment().format();
        await createRecipe (req, res, next);
    }
    catch (e) {
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.getAllRecipe = async (req, res, next) => {
    try {
        getAllRecipe(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.updateRecipe = async (req, res, next) => {
    try {
        updateRecipe(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
};
  