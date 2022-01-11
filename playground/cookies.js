// Example for creating a cookie

const cookieParser = require("cookie-parser");

app.use(cookieParser());

//Cookies
app.get("/set-cookies", (req, res) => {
    // this is how we define a cookie without using cookieParser
    // res.setHeader("Set-Cookie", "newUser = true"); 
  
    // w/cookieParser
    res.cookie('newUser', false)
    // res.cookie('isEmployee', true, {maxAge: 1000 * 24 * 60 * 60, httpOnly:true, secure:true}) httpOnly: you can access the cookies only client side, secure:true : https only
    res.cookie('isEmployee', true, {maxAge: 1000 * 24 * 60 * 60, httpOnly: true})
    res.send('you got the cookies')
  });
  
  app.get('/read-cookies', (req, res)=> {
    const cookies = req.cookies
    console.log(cookies.newUser);
    res.send(cookies)
  
  })
  