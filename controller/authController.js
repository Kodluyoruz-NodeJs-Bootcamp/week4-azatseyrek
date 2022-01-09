const User = require("../models/User");

module.exports.signupGet = (req, res) => {
  res.render("signup");
};
module.exports.signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email: email,
      password: password,
    });
    res.status(201)
    res.send(user)


  } catch (err) {
res.status(400)
res.send("error, user not created")
  }
};
module.exports.loginGet = (req, res) => {
  res.render("login");
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = User.create({
      email: email,
      password: password
    })
  } catch (err) {
    console.log(error);
  }
};
