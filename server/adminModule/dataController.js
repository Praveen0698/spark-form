const adminModel = require("./schema");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    try {
      const user = await adminModel.findOne({
        username: req.body.username,
      });

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;

      if (originalPassword != inputPassword) {
        res.json("failure");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            userType: "admin",
          },
          process.env.JWT_SEC,
          { expiresIn: "3h" }
        );

        res.status(200).json({ accessToken });
      }
    } catch (err) {
      res.json("failure");
    }
  } catch (err) {
    res.json(err);
  }
};
