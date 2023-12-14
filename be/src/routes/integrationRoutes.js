const express = require("express");
const integrationRoutes = express.Router();

const {
  getIntegrationURL,
  createAccessID,
  getStatus,
  removeToken,
} = require("../controllers/integrationController");

integrationRoutes.get("/url", getIntegrationURL);
integrationRoutes.get("/create", createAccessID);
integrationRoutes.get("/status", getStatus);
integrationRoutes.get("/remove", removeToken);

module.exports = {
  integrationRoutes,
};
