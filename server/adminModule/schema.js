require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("login db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
