require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer');
const helmet     = require('helmet')
var expressLayouts = require("express-ejs-layouts");
const session = require('express-session')
const flash = require('express-flash')
const app = express()

app.use(helmet())
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
    res.render("index", { title: "Home" });
})


app.get("/resume", (req, res) => {
  res.render("resume", { title: "Resume" });
});
app.get("/portfolio", (req, res) => {
  res.render("portfolio", { title: "Portfolio" });
});


app.get("/contact", (req, res) => {
  res.render("contact",{title:"Contact"});
});

app.post('/contact', (req,res) => {
    const {name,email,message} = req.body
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO,
      subject: "New Mail From Your Portfolio",
      html: `<h4>Sender: ${name}</h4><h>Email: ${email} </h><p class="lead">${message}</p>`,
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err){
        req.flash(
          "error",
          `There was an error sending your message please try again. Thank you!`
        );
        res.redirect("/contact");
      } 
      else{
        req.flash('success', `Dear ${name}, your message was sent successfully.I will get back to you as soon as possible, Thank you for reaching out.`)
        res.redirect('/contact')
      } 
    });
   
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Application Started on http://localhost:3000`)
})