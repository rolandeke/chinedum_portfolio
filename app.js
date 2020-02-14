require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer');
var expressLayouts = require("express-ejs-layouts");
const session = require('express-session')
const flash = require('express-flash')
const app = express()

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
  secret:"justnode",
  resave:false,
  saveUninitialized:false
}))
app.use(flash())

app.get('/', (req,res) => {
    res.render('index')
})


app.get("/resume", (req, res) => {
  res.render("resume");
});
app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});


app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post('/contact', (req,res) => {
    const {name,email,message} = req.body
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO, 
      subject: "New Mail From Your Portfolio", 
      html: `Sender: ${name} <br> Email: ${email} <br> <p>${message}</p>` 
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err){
        req.flash(
          "error",
          `There was an error sending your message please try again. Thank you`
        );
        res.redirect("/contact");
        //console.log(err);
      } 
      else{
        req.flash('success', `Dear ${name}, your message was sent successfully.I will get back to you as soon as possible, Thank you!`)
        res.redirect('/contact')
        //console.log(info);
      } 
    });
   
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Application Started on http://localhost:3000`)
})