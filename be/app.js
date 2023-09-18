const express = require("express");
const app = express();
const cors = require("cors");
var HTTPS = require("https");
var fs = require("fs");
const createError = require("http-errors");
const router_electric = require("./routers/index");


app.use(cors());
app.use(express.json()); //đọc json
app.use(express.urlencoded({ extended: true })); // đọc dạng url

app.use("/api", router_electric)
app.use((error, req, res, next) => {
  const messages = error.message
    .split(":")
    .map((v) => (Number(v) ? Number(v) : v));
  const httpError = createError(...messages);
  res.status(httpError.statusCode || 500).json(httpError);
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server API Work at Port: " + process.env.PORT );
})
