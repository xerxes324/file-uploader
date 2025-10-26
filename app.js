const express = require("express");
const app = express();
const router = require("./routes/userRouter");
const passport = require("passport");
const session = require('express-session');
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client/extension");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({

    cookie:{
        maxAge:7*24*60*60*1000
    },

    secret: "keyboard cats",
    resave : false,
    saveUninitialized : false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router.userRouter);



const PORT = 3000;


app.listen(PORT, ()=>{
    console.log("Listening..");
})