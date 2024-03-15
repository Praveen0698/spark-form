const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/build");
app.use(express.static(buildpath));

app.use(
  cors({
    origin: "*",
  })
);

module.exports = app;
