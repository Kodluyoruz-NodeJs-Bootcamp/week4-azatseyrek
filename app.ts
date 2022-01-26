require("dotenv").config();
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";

import { render } from "./routes/helpers";
import authRoutes from "./routes/authRoutes";
import { requireAuth, checkUser } from "./middleware/authMiddleware";

//  we are going to create our sql connection here
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "gusto_login",
  entities: ["./entity/*.ts"],
  logging: false,
  synchronize: true,

  // after the connection i prefered to start port
}).then((connection) => {
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
  app.get("*", checkUser); //we want to check the user at all of paths so we added the middleware which we created inside the authMiddleware.js to all routes
  app.get("/", render("home"));
  app.get("/programmers", requireAuth, render("programmers"));
  app.use(authRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT), console.log(`port started at ${PORT}`);
});
