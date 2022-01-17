//Creating our routes
//It is look like a get request but using Router is an easier way. You can keep in mind that is similar to its usage in ReactJs
import { Router } from "express";
import { clearCookie, redirect, render } from "./helpers";
import { login, register } from "../controller/authController";

const router = Router();

//We have two get and two post method. Gets are about for the routing Posts are used to get user information.
//  first parameter is our route and the second is our function which we imported at the controller/authController.js

// router.get("/app", getProgrammers);

// View Routes
router.get("/login", render("login"));
router.get("/signup", render("signup"));
router.get("/logout", clearCookie, redirect("/"));

router.post("/login", login);
router.post("/signup", register);

// I used MVC patterns in this project while that I will define my functions in 'controllers' folder

const authRoutes = router;
export default authRoutes;
