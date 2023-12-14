const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_URI } = require("./src/appConstans");
const { integrationRoutes } = require("./src/routes/integrationRoutes");
const { mainRoutes } = require("./src/routes/mainRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use("/", mainRoutes);
app.use("/integration", integrationRoutes);

mongoose.connect(MONGODB_URI).then(() => {
  console.log("App connected to Database");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
