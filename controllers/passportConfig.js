const passport = require("passport")
const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

exports.autoLogin = async(req,res,next) => {
    const emailID = req.body.email;

    const user = await prisma.users.findUnique({
        where:{
            email:emailID
        }
    })
    console.log(user,'is the user guys!');

    req.login(user, function(err){
        if ( err ){
            console.log('error!');
            return next(err);
        }
        return res.redirect("/dashboard");
    })
}

exports.autoLogout = async(req,res,next) =>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect("/");
    })
}


passport.serializeUser((user,done) => {
    console.log(user,'IS HERE');
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await prisma.users.findUnique({
            where:{
                id: id
            }
        })
        // console.log(user, "is query oppp");
        done(null,user);
    }
    catch(err){
        return done(err);
    }
})

passport.use(
    new LocalStrategy(async(username,password,done) => {
        try{
            const user = await prisma.users.findUnique({
                where:{
                    email: username
                }
            })
            if (user === null){
                throw new Error("Incorrect email");
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match){
                throw new Error("Passwords don't match");
            }

            return done(null,user);
        }
        catch(err){
            done(err);
        }
    })
)

//onclick="window.location.href = '/foldercontents/?id=<%=value.id%>' "