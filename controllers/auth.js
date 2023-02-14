const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../models/auth");
const keys = process.env;

module.exports.login = async function (req, res, next) {
  const candidate = await auth.findOne({ name: req.body.name });
  if (candidate) {
    const passwordResult = bcrypt.compare(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          name: candidate.name,
          userId: candidate._id,
        },
        keys.secretkey,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: `Bearer ${token}`,
        userId: candidate._id,
        name: candidate.name,
        message: "You made it to the secure route",
      });
    } else {
      res.status(401).json({
        message: "Password mismatched",
      });
    }
  } else {
    res.status(404).json({
      message: "User with this name don't find",
    });
  }
};
