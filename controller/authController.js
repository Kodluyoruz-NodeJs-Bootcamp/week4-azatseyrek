const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  //duplicate err code
  
  //error message: E11000 duplicate key error collection: node-auth.users index: email_1 dup key: { email: "miranali@asd.com" } 11000

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60; // for expiresIn parameter

// we are going to use this createToke function inside the create User  !!!
const createToken = (id) => {
  return jwt.sign({ id }, "gusto remote team", {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signupGet = (req, res) => {
  res.render('signup');
}

module.exports.loginGet = (req, res) => {
  res.render('login');
}

module.exports.signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); //cookie uses miliseconds as unit so we multiply by 1000
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err); // this is a cb function for catching the err.message which is came from to our User model
    res.status(400).json({ errors });
  }
 
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}