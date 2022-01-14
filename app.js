const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const session = require('express-session')


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  cookie: {
    maxAge:600000,
    httpOnly: true
  },
  resave: false,
  saveUninitialized:false
}))

// view engine
app.set('view engine', 'ejs');

// database connection

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000), console.log("port started"))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser) //we want to check the user at all of paths so we added the middleware which we created inside the authMiddleware.js to all routes
app.get('/',  (req, res) => res.render('home'));
app.get('/programmers', requireAuth, (req, res) => res.render('programmers'));
app.use(authRoutes);
