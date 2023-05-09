const express = require("express");
const app = express();

const router = express.Router();

const users = require("./controllers/users.controller");

router.post("/users" + "/create", users.create);
router.get("/users" + "/", users.findAll);
router.get("/users" + "/:id", users.findOne);
router.put("/users" + "/edit/:id", users.update);
router.delete("/users" + "/delete/:id", users.delete);



module.exports = router;
