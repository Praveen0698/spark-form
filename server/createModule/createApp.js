const app = require("../server");

const { createUser, findUser, getUserDetail } = require("./dataController");

app.post("/create-user", createUser);
app.post("/user-form", findUser);
app.get("/get-user", getUserDetail);

module.exports = app;
