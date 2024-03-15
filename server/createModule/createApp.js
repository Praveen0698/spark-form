const app = require("../server");
const multer = require("multer");
const path = require("path");

const { createUser, findUser, getUserDetail } = require("./dataController");

app.post("/create-user", createUser);
app.post("/user-form", findUser);
app.get("/get-user", getUserDetail);

module.exports = app;
