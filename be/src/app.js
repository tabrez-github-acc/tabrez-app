const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { integrationRoutes } = require("./routes/integrationRoutes");
const { mainRoutes } = require("./routes/mainRoutes");

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://127.0.0.1:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/", mainRoutes);
app.use("/integration", integrationRoutes);

module.exports = app;
