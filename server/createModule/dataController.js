const userModel = require("./schema");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.userName,
    });
    if (user) {
      res.json("failure");
    } else {
      await userModel.create({
        username: req.body.userName,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_USER
        ).toString(),
        companyName: req.body.companyName,
        colorPicker: req.body.colorPicker,
        address: req.body.address,
        file: req.file.filename,
      });
      res.json("success");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findUser = async (req, res) => {
  try {
    try {
      const user = await userModel.findOne({
        username: req.body.username,
      });

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_USER
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;

      if (originalPassword != inputPassword) {
        res.json("failure");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            companyName: user.companyName,
            colorPicker: user.colorPicker,
            address: user.address,
            file: user.file,
            userType: "user",
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

exports.getUserDetail = async (req, res) => {
  await userModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};
