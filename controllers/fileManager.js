const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const fs = require('fs');
const {supabase} = require("../supabaseClient");

exports.supabaseUpload = async(req,res,next) => {

    const filesize = req.file.size / ( 1024 * 1024);

    if ( filesize > 10){ 
        console.log('select file <10MB')
        res.redirect("/dashboard");
    }
    else{
        const file = req.file;
        const buffer = fs.readFileSync(file.path)
        console.log(req.user.id,"is the user ID");
        const {data,error} = await supabase.storage.from('file-bucket').upload(
            `users/${req.user.id}/${file.originalname}/${file.filename}`, 
            buffer
        )
        if ( error ){
            console.error(error,"Failed to upload to supabase.");
        }
        else{
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
                folder_id:null,
                user_id:req.user.id
            }
        })

    }

    else{
        await prisma.files.create({
            data:{
                originalname: req.file.originalname,
                filename : req.file.filename,
                path : req.file.path,
                size : req.file.size,
                folder_id: req.session.parentFolderID,
                user_id: req.user.id
            }
        }

        )
    }


    next();

}


exports.getFilesByID = async(id, user) => {
    const files = await prisma.files.findMany({
        where:{
            folder_id: id,
            user_id: user
        }
    })
    return files;
}


exports.downloadFile = async(req,res,next) => {

    const path = `users/${req.user.id}/${req.query.originalname}/${req.query.filename}`;
    const {data,error} = await supabase.storage.from('file-bucket').download(path)
    if (error){
        res.redirect("/dashboard");
    }
    else{
        const buffer = Buffer.from(await data.arrayBuffer());
        res.setHeader('Content-Disposition', `attachment; filename="${req.query.name}"`)
        res.send(buffer);
    }
}


exports.generateURL = async (req, res, next) => {
    const days = req.body.days;
    const originalname = req.body.file;
    const userId = req.user.id;
    const filename_unique = req.body.filename;

    let seconds;
    if (days === '3') seconds = 3600 * 24 * 3;
    else if (days === '10') seconds = 3600 * 24 * 10; 
    else if (days === '30') seconds = 3600 * 24 * 30; 

    const { data, error } = await supabase.storage
        .from('file-bucket')
        .createSignedUrl(`users/${userId}/${originalname}/${filename_unique}`, seconds);

    if (error) {
        console.error(error);
        return res.status(500).send("Error generating URL");
    }
    res.send(data.signedUrl);
};
