const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const db = require("./models");

const users = require("./controllers/users.controller");
const jobs = require("./controllers/jobs.controller");
const calculator = require("./controllers/calculator.controller");
const test = require("./controllers/test.controller");
const test1 = require("./controllers/test1.controller");
const testing = require("./controllers/testing.controller");
const user = require("./controllers/user.controller");

const app = express();
const PORT = process.env.PORT || 5000;
const pathApi = "/api";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger.requestLogger);

function useAuth(req, res, next) {
  if (!user.isLogin(req)) {
    res.status(203).send({
      message: "Please Login",
    });
    return;
  }

  next();
}

app.use("/apitest", useAuth, require("./routeAuth.js"));

db.sequelize
  .sync() //{ force: true } reset database on save
  .then(() => {
    console.log("Synced db.");
    console.log("Enjoy !! 👾 🤖");
    console.log(`Curtain-c Server started... port ${PORT}`);
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// testing api
app.get(pathApi + "/", (req, res) => {
  res.json("Hello World form server Curtain-c");
});

// users api
// {
//   app.post(pathApi + "/users" + "/create", users.create);
//   app.get(pathApi + "/users" + "/", users.findAll);
//   app.get(pathApi + "/users" + "/:id", users.findOne);
//   app.put(pathApi + "/users" + "/edit/:id", users.update);
//   app.delete(pathApi + "/users" + "/delete/:id", users.delete);
// }

// jobs api
{
  app.post(pathApi + "/jobs" + "/create", jobs.create);
  app.get(pathApi + "/jobs" + "/", jobs.findAll);
  app.get(pathApi + "/jobs" + "/:id", jobs.findOne);
  app.put(pathApi + "/jobs" + "/edit/:id", jobs.update);
  app.delete(pathApi + "/jobs" + "/delete/:id", jobs.delete);
}
//calculator
app.use(pathApi + "/calculator" + "/", calculator.calculator);

{
  app.post(pathApi + "/test1" + "/create", test1.create);
  app.get(pathApi + "/test1" + "/", test1.findAll);
  app.get(pathApi + "/test1" + "/:id", test1.findOne);
  app.put(pathApi + "/test1" + "/edit/:id", test1.update);
  app.delete(pathApi + "/test1" + "/delete/:id", test1.delete);
  app.get(pathApi + "/pdf", test1.genpdf);
}

{
  // app.post(pathApi + "/user" + "/create", user.create);
  // app.get(pathApi + "/user" + "/", user.findAll);
  // app.get(pathApi + "/user" + "/:id", user.findOne);
  // app.put(pathApi + "/user" + "/edit/:id", user.update);
  // app.delete(pathApi + "/user" + "/delete/:id", user.delete);

  app.post(pathApi + "/register", user.register);
  app.post(pathApi + "/login", user.login);
  app.post(pathApi + "/check", user.check);

  app.post(pathApi + "/testauth", user.testauth);
}

// Run the server
app.listen(PORT, () => {
  console.log(`Curtain-c Server started... port ${PORT}`);
});
