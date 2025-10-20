const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const fs = require('fs');
const {supabase} = require("../supabaseClient");

exports.validateFile = async(req,res,next) => {

    console.log(req.session.parentFolderID, 'is parent folder loc');

    //storing the query ID in session 

    console.log('the file is', req.file);
    const filesize = req.file.size / ( 1024 * 1024);
    console.log("filesize in MB is:", filesize);

    if ( filesize > 10){ // 10mB limit
        console.log('select file <10MB')
        //add smth for error popup handling
        res.redirect("/dashboard");
    }
    else{
        const file = req.file;
        const buffer = fs.readFileSync(file.path)

        const {data,error} = await supabase.storage.from('file-bucket').upload(
            `users/${req.session.userID}/${file.originalname}`, 
            buffer
        )
        if ( error ){
            console.log(error,"is the errorn bro.");
            console.error("Failed to upload to supabase");
        }
        else{
            console.log('success!');
            next();
        }
    }
}


exports.addFile = async(req,res,next) =>{

    const location = req.body.location;
    console.log(location, 'is the page location');
    
    res.locals.location = req.body.location;

    if ( location === "/dashboard"){

        await prisma.files.create({
            data:{
                originalname:req.file.originalname,
                filename:req.file.filename,
                path: req.file.path,
                size:req.file.size,
                folder_id:null
            }
        })

    }

    else{
        console.log(req.session.parentFolderID, 'is the PARENT');
        
        await prisma.files.create({
            data:{
                originalname: req.file.originalname,
                filename : req.file.filename,
                path : req.file.path,
                size : req.file.size,
                folder_id: req.session.parentFolderID
            }
        }

        )
    }


    next();

}


exports.getFilesByID = async(id) => {
    const files = await prisma.files.findMany({
        where:{
            folder_id: id
        }
    })
    return files;
}





// constrain the size of file to less than something. else error popup
//