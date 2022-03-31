const client = require("../config/mongodb");
const _ = require("lodash");

module.exports.createPackage = async (req, res, next) => {
    req.valPackage.packageId = await client
        .db(process.env.DB)
        .collection('package')
        .countDocuments() + 1

    await client
        .db(process.env.DB)
        .collection('package')
        .insert(req.valPackage)
        .then((result) => {
    if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" })
    }
    });
}

module.exports.getAllPackage = async (req, res, next) => {
    try {
      var _package = await client
        .db(process.env.DB)
        .collection("package")
        .find({})
        .toArray();
  
      if (req.query.packageName != undefined) {
        _package = _.filter(_package, (o) => {
          if (o.packageName == undefined) o.packageName = "";
          if (
            new String(o.packageName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
              .toLocaleLowerCase()
              .includes(
                req.query.packageName
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          )
            return o;
        });
      }
  
      res.send({ success: true, data: _package });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.updatePackage = async (req, res, next) => {
    try {
      client
        .db(process.env.DB)
        .collection("package")
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