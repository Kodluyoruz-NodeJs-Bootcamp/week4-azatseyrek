const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000), console.log("Port started on 3000");
  })
  .catch((err) => console.log(err));

// Home And Students Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/programmers", (req, res) => {
  res.render("programmers");
});
// // Auth routes
app.use(authRoutes);