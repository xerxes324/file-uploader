const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.emailExists = async(req,res,next) =>{
    const exists = await prisma.users.findUnique({
        where:{
            email:req.body.email
        }
    })
    if ( exists !== null){
        throw new Error('Email already exists');
    }
    else{
        next();
    }
}

exports.createUser = async(req,res,next) =>{
    const password = await bcrypt.hash(req.body.signuppassword,10);
    await prisma.users.create({
        data:{
            name:req.body.username,
            email: req.body.email,
            password: password
        }
    })
    next();
}
