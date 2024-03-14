const app = require("../server");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
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
app.use(upload.any());

const { createForm, getForm } = require("./dataController");

app.post("/spark-form", createForm);
app.get("/spark-form", getForm);

module.exports = app;
