require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";

import { requireAuth, checkUser } from "./middleware/authMiddleware";
import { render } from "./routes/helpers";
import authRoutes from "./routes/authRoutes";

const app = express();

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    cookie: {
      maxAge: 600000,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(checkUser);

// routes
// app.get('*', checkUser) //we want to check the user at all of paths so we added the middleware which we created inside the authMiddleware.js to all routes
app.get("/", render("home"));
app.get("/programmers", requireAuth, render("programmers"));
app.use(authRoutes);

// database connection

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_DB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT), console.log(`port started at ${PORT}`);
  })
  .catch((err) => console.log(err));
