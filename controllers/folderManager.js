const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.addFolder = async(req,res,next)=>{

    res.locals.location = req.body.location;
    if ( res.locals.location === "/dashboard"){

        //set folders PARENT_ID to null
        await prisma.folders.create({
            data:{
                folder_name: req.body.foldername,
                user_id : req.user.id,
                parent_id : null
            }
        })
    }

    else{
        await prisma.folders.create({
            data:{
                folder_name : req.body.foldername,
                parent:{connect:{id: req.session.parentFolderID}},
                user:{connect:{id: req.user.id}}  
            }
        })
    }

    next();
}

// runs when user clicks on a folder
exports.displayFolderContents = async(req,res,next)=>{
    console.log(req.query.id, 'is the query id');
    const folderID = parseInt(req.query.id);
    req.session.parentFolderID = parseInt(req.query.id);
    console.log(req.session.parentFolderID,'is the one');
    next();
}



//utility fns

exports.getFoldersByID = async(id) =>{
    const folders = await prisma.folders.findMany({
        where : {user_id : id, parent_id: null}
    });
    return folders;
}


exports.getSubfoldersByID = async(folderID) => {
    const subfds = await prisma.folders.findMany({
        where:{
            parent_id:folderID
        }
    })

    return subfds;
}


exports.getFiles = async(id) => {
    const files = await prisma.files.findMany({
        where:{folder_id : id}
    });
    return files;
}