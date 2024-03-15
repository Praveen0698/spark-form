const app = require("../server");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const { createAdmin } = require("./dataController");
const {
  createUser,
  findUser,
  getUserDetail,
} = require("../createModule/dataController");
const { createForm, getForm } = require("../formModule/dataController");

app.post("/admin-form", createAdmin);

app.post("/create-user", upload.single("file"), createUser);
app.post("/user-form", findUser);
app.get("/get-user", getUserDetail);

app.post("/spark-form", upload.any(), createForm);
app.get("/spark-form", getForm);

module.exports = app;
