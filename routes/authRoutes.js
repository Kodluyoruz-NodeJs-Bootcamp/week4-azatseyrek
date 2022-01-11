//Creating our routes
//It is look like a get request but using Router is an easier way. You can keep in mind that is similar to its usage in ReactJs
const { Router } = require("express");
// authController inport
const authController = require('../controller/authController')

const router = Router();

//We have two get and two post method. Gets are about for the routing Posts are used to get user information.
//  first parameter is our route and the second is our function which we imported at the controller/authController.js
router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logoutGet);




// I used MVC patterns in this project while that I will define my functions in 'controllers' folder

module.exports = router
