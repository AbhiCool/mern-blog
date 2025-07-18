const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await UserModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.json({ message: "registered", newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await jwt.sign(
      { username, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // set true in production
    });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.cookie("token", "");
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
