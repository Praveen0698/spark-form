const app = require("../server");

const { createAdmin } = require("./dataController");

app.post("/admin-form", createAdmin);

module.exports = app;
