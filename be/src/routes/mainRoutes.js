const express = require("express");
const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => {
  res.status(200).send({ status: "OK" });
});

module.exports = {
  mainRoutes,
};
