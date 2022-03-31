const client = require("../config/mongodb");
const _ = require("lodash");

module.exports.createRecipe = async (req, res, next) => {
    req.valRecipe.idRecipe = await client
      .db(process.env.DB)
      .collection("recipe")
      .find({})
      .toArray();
    var max = _.sortBy(req.valRecipe.idRecipe, (o) => {
      return parseInt(o.idRecipe);
    });
    if (max != undefined && max.length != 0) {
      req.valRecipe.idRecipe = parseInt(max[max.length - 1].idRecipe) + 1;
    } else {
      req.valRecipe.idRecipe = 1;
    }

    await client
        .db(process.env.DB)
        .collection('recipe')
        .insert(req.valRecipe)
        .then((result) => {
    if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" })
    }
    });
}

module.exports.getAllRecipe = async (req, res, next) => {
    try {
      var _recipe = await client
        .db(process.env.DB)
        .collection("recipe")
        .find({})
        .toArray();
  
      if (req.query.title != undefined) {
        _recipe = _.filter(_recipe, (o) => {
          if (o.title == undefined) o.title = "";
          if (
            new String(o.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
              .toLocaleLowerCase()
              .includes(
                req.query.title
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          )
            return o;
        });
      }
  
      res.send({ success: true, data: _recipe });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.updateRecipe = async (req, res, next) => {
    try {
      client
        .db(process.env.DB)
        .collection("recipe")
        .updateOne(
          {
            recipeId: parseInt(req.params.id),
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