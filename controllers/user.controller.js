const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.user;
const Op = db.Sequelize.Op;

const JWT_SERECT = "23fsOJyT5s5AvDkNFak191dhAlxn7Ch";

// Check
exports.check = async (req, res) => {
  let authorization = req.headers["authorization"];
  if (!authorization) {
    res.status(203).send({ message: "Missing Token." });
  }

  authorization = authorization.split(" ")[1];

  const decryptedUser = jwt.verify(authorization, JWT_SERECT);
  const user = User.findOne({
    where: {
      user_name: decryptedUser.username,
    },
  });

  if (!user) {
    res.status(203).send({ message: "Unauthorize." });
  }

  return true;
};

exports.isLogin = (req) => {
  let authorization = req.headers["authorization"];
  if (!authorization) return false;

  authorization = authorization.split(" ")[1];

  try {
    const decryptedUser = jwt.verify(authorization, JWT_SERECT);
    const user = User.findOne({
      where: {
        user_name: decryptedUser.user_name,
      },
    });
    return !!user;
  } catch (e) {
    console.log("Error: " + e.message)
    return false;
  }
}

// Login
exports.login = async (req, res) => {
  const { user_name, password } = req.body;
  const user = await User.findOne({
    where: { user_name: user_name },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(203).send({
      message: "Incorrect Username or Password.",
    });
    return;
  }

  const token = jwt.sign(
    {
      user_name: user.user_name,
      email: user.email,
    },
    JWT_SERECT
  );

  res.status(200).send({
    token: token,
  });
};

// Register
exports.register = async (req, res) => {
  const { user_name, email, password } = req.body;
  const user = await User.findOne({
    where: { user_name: user_name },
  });

  if (user) {
    res.status(203).send({
      message: "Duplicated user.",
    });
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const createUser = await User.create({
      user_name: user_name,
      email: email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        user_name: createUser.user_name,
        email: createUser.email,
      },
      JWT_SERECT
    );

    res.status(200).send({
      user_name: createUser.user_name,
      email: createUser.email,
      token: token,
    });
  } catch (e) {
    res.status(203).send({
      message: "Failed to create user.",
    });
  }
};

// Test
exports.testauth = async (req, res) => {
  if (!isLogin(req)) {
    res.status(203).send({
      message: "Please Login",
    });
    return;
  }

  res.status(200).send({
    message: "Welcome",
  });
};
