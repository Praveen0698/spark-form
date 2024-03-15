require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("User db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  companyName: String,
  colorPicker: String,
  file: String,
  address: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
