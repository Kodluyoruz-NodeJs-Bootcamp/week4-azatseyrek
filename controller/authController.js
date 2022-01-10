const User = require("../models/User");
const jwt = require('jsonwebtoken')

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

// create token
let expireTime = 3* 24 * 60 * 60 // for expiresIn parameter

// we are going to use this createToke function inside the create User  !!!
const createToken = (id) => {
  // jwt.sign('id', 'our key', 'expireTime')
  return jwt.sign({id}, 'gusto remote team', {
    expiresIn: expireTime //jwt uses seconds not milliseconds as unit
  });
}



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
    const token = createToken(user._id)
    res.cookie('created with jwt', token, {httpOnly: true, maxAge: expireTime *1000}) //cookie uses miliseconds as unit so we multiply by 1000
    res.status(201);
    res.json({user: user._id});

    
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
  const user = await User.login(email, password);
  res.status(200).json({user: user._id})

} catch (error) {
  res.status(400)
  res.json({})
}

};
