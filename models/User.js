const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt"); //for hash the passwords

// create Schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"], //second parameter is err.message which we used in authController cb functions
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"], //second parameter is err.message which we used in authController cb functions
  },
  password: {
    type: String,
    require: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// Fire a function after a doc saved to db
//This is a mongoose hook. Mongoose  hooks can be used to fire a code at different points when documents are saved to the db
userSchema.post("save", function (doc, next) {
  console.log("New user was created & saved", doc);
  next();
  //the next parameter is a function provided to you by mongoose to have a way out, or to tell mongoose you are done and to continue with the next step in the execution chain.

  // post middleware documantation: https://mongoosejs.com/docs/middleware.html#post
});

// fire a function before doc saved to db
// we can hash password before to save data to db inside this 'pre' hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
  
});
//  static method to login user 
   userSchema.statics.login = async function(email, password) {
     const user = await this.findOne({email});
     if(user) {
       const auth = await bcrypt.compare(password, user.password);
       if(auth) {
         return user
       }
       throw Error('incorrect password')
     }
     throw Error('incorect email')
   }

// Create Model
const User = mongoose.model("user", userSchema);

module.exports = User;
