const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { jwtsecret } = require("../configs/var");
const { json } = require("express");

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        status: false,
        message: "require missing fields",
      });
    }

    //validate all we are skipping it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: true,
      message: "user created succesfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error while creating user",
      data: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: false,
        message: "require missing fields",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({
        status: false,
        message: "invalid email or password",
      });
    }
    const isValidPassowrd = bcrypt.compare(password, user.password);
    if (!isValidPassowrd) {
      res.status(401).json({
        status: false,
        message: "invalid email or password",
      });
    }
    const token = JWT.sign({ userId: user._id }, jwtsecret, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(200).json({
      status: true,
      message: "user loggin succesfully",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "somthing went wrong",
      data: error,
    });
  }
};

module.exports.getuserInfo = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user);
    if (!userId) {
      res.status(401).json({
        status: false,
        message: " no valid user",
        data: error,
      });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({
        status: false,
        message: "no user found",
        data: error,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "somthing went wrong",
      data: error,
    });
  }
};
