const client = require("../config/mongodb");
const _ = require("lodash");
const moment = require('moment');

module.exports.getAllBlog = async (req, res, next) => {
  try {
    var blogs = await client
      .db(process.env.DB)
      .collection("blog")
      .find({ is_active: true })
      .toArray();

    blogs = _.reverse(blogs);

    res.send({ success: true, data: blogs });
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getBlogDetail = async (req, res, next) => {
  try {
    var blog = await client.db(process.env.DB).collection("blog").findOne({
      idBlog: parseInt(req.query.idBlog),
      is_active: true
    });

    return res.send({ success: true, data: blog });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.insertBlog = async (req, res, next) => {
  try {
    var _blog = await client
      .db(process.env.DB)
      .collection("blog")
      .find({})
      .toArray();
    var max = _.sortBy(_blog, (o) => {
      return parseInt(o.idBlog);
    });
    if (max != undefined && max.length != 0) {
      req.body.idBlog = parseInt(max[max.length - 1].idBlog) + 1;
    } else {
      req.body.idBlog = 1;
    }

    req.body.createAt = moment().format();
    req.body.is_active = true

    await client
      .db(process.env.DB)
      .collection("blog")
      .insertOne(req.body)
      .then((result) => {
        return res.send({ success: true, data: req.body });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.updateBlog = async (req, res, next) => {
  try {
    await client
      .db(process.env.DB)
      .collection("blog")
      .updateOne(
        {
          id: parseInt(req.params.id),
        },
        {
          $set: {
            ...req.body,
          },
        }
      )
      .then((result) => {
        return res.send({ success: true, data: req.body });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.removeBlog = async (req, res, next) => {
  try {
    await client
      .db(process.env.DB)
      .collection("blog")
      .deleteOne({
        id: parseInt(req.params.id),
      })
      .then((result) => {
        return res.send({ success: true, mess: "Deleted !" });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};
