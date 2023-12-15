const app = require("./src/app");
const { connect, disconnect } = require("./src/dbConnection");

connect(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listening at http://localhost:${process.env.APP_PORT}`);
  });
});

process.on("SIGINT", () => {
  console.log("App is terminating...");
  disconnect(() => {
    process.exit(0);
  });
});
