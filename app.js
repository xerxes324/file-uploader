const express = require("express");
const app = express();
const router = require("./routes/userRouter");
const passport = require("passport");
const session = require('express-session');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cats",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router.userRouter);



const PORT = 3000;


app.listen(PORT, ()=>{
    console.log("Listening..");
})