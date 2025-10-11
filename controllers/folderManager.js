const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
// req.url -> gives /newfolder 
// req.body.location -> gives dahsboard here and /newfolder in controller

exports.addFolder = async(req,res,next)=>{
    console.log(req.url,"is the location");
    console.log(req.user,"is the user");

    res.locals.location = req.body.location;
    console.log(res.locals.location, 'iS the loc');
    if ( res.locals.location === "/dashboard"){

        //set folders PARENTID to null;
        
        await prisma.folders.create({
            data:{
                folder_name: req.body.foldername,
                user_id : req.user.id,
                parent_id : null
            }
        })
    }

    else{

        // set folders parentID to query value
        const folderID = req.query.id;
        // console.log(req.url, 'is the subfolder URL');
        console.log(req.session.parentFolderID, 'is the parent ID');
        console.log(req.body, 'is the body');

        await prisma.folders.create({
            data:{
                folder_name : req.body.foldername,
                // parent_id: req.session.parentFolderID,
                parent:{connect:{parent_id: req.session.parentFolderID}},
                user:{connect:{id: req.user.id}}  
            }
        })

    }

    next();
}


exports.addSubfolder = async(req,res,next) => {

    console.log(req.query.id, 'is the ID');
    next();
}


exports.displayFolderContents = async(req,res,next)=>{
    console.log(req.query.id, 'is the query id');
    const folderID = parseInt(req.query.id);
    req.session.parentFolderID = parseInt(req.query.id);
    console.log(req.session.parentFolderID,'is the one');
    const files = await prisma.files.findMany({
        where:{
            folder_id : folderID,
        }
    })

    const subfolders = await prisma.folders.findMany({
        where:{
            parent_id: folderID
        }
    })  

    // query subfolders here where parent_id = folder_id. ( will be set in above function )

    console.log("files are:", files, "and subfolders:", subfolders);
    next();
}



//utility fns

exports.getFoldersByID = async(id) =>{
    const folders = await prisma.folders.findMany({
        where : {user_id : id}
    });
    // console.log(folders,'is folder op');
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
    console.log(files,"is the files output prisma");
    return files;
}





/*

Adding -> 
if URL = /dashboard : prismacreate with folder parent = null
else : prismacreate with folder parent = parentfolderID

Disp -> get the URL from the frontend and if dash -> query accordingly 
if not, then redir to dashboad/id ( define a get req for this )

*/