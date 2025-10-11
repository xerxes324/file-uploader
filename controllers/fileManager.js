const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.validateFile = async(req,res,next) => {
    console.log('the file is', req.file);
    const filesize = req.file.size / ( 1024 * 1024);
    console.log("filesize in MB is:", filesize);

    if ( filesize > 10){ // 10mB limit
        console.log('select file <10MB')
        //add smth for error popup handling.
    }
    else{
        next();
    }
}


exports.addFile = async(req,res,next) =>{
    
    // await prisma.files.create({
    //     data:{
    //         originalname: req.file.originalname,
    //         filename: req.file.filename,
    //         path: req.file.path,
    //         size : Math.round(req.file.size / ( 1024 * 1024 )).toFixed(2),
    //         folder_id: 
    //     }
    // })
    
}

// constrain the size of file to less than something. else error popup
// 