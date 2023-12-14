const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const { integrationRoutes } = require("./src/routes/integrationRoutes");
const { mainRoutes } = require("./src/routes/mainRoutes");

dotenv.config();
const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/", mainRoutes);
app.use("/integration", integrationRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("App connected to Database");
});

app.listen(process.env.APP_PORT, () => {
  console.log(`App listening at http://localhost:${process.env.APP_PORT}`);
});
