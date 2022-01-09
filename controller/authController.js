const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //duplicate err code
  
  //error message: E11000 duplicate key error collection: node-auth.users index: email_1 dup key: { email: "miranali@asd.com" } 11000
  if(err.code === 11000) {
    errors.email = 'that email is already registered'
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err.errors.email.properties.message)

    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};


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
    res.status(201);
    res.send(user);
  } catch (err) {
    const errors = handleErrors(err); // this is a cb function for catching the err.message which is came from to our User model
    res.status(400);
    res.send({errors});
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
      password: password,
    });
  } catch (err) {
    console.log(error);
  }
};
