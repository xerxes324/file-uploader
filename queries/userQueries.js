const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


// async function main(){
//     const res = await prisma.user.findMany();
//     console.log(res, "is the query o.p");
// }

// main().then(async()=>{
//     await prisma.$disconnect()
// }).catch(async(e)=>{
//     console.error(e);
//     await prisma.$disconnect()
//     process.exit(1);
// })

exports.emailExists = async(req,res,next) =>{
    const exists = await prisma.user.findUnique({
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
    console.log(password,'is the pwd');
    await prisma.user.create({
        data:{
            name:req.body.username,
            email: req.body.email,
            password: password
        }
    })

    //remove this after code completion
    const users = await prisma.user.findMany();
    console.log(users,'is prisma op');
    next(); 
}