const mongoose = require("mongoose");

module.exports = {
  connect: (callback) => {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("App connected to Database");
        callback();
      })
      .catch((err) => {
        console.log("App failed to connect to Database, ", err.message);
        process.exit(1);
      });
  },
  disconnect: (callback) => {
    mongoose.disconnect().then(() => {
      console.log("App disconnected from Database");
      callback();
    });
  },
};
