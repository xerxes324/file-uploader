const folders = require("../controllers/folderManager")
const files = require("../controllers/fileManager")

exports.login= async(req,res,next) =>{
    res.render("login", {errors: ""});
}

exports.signup = async(req,res,next) => {
    res.render("signup", {errors: []});
}

exports.dashboard = async(req,res,next) =>{
    
    const location = req.url;
    if ( location === "/dashboard"){

        const fd = await folders.getFoldersByID(req.user.id);
        const fl = await files.getFilesByID(null);


        if ( !fd || fd.length === 0){ //files in home dir
            res.render("dashboard", {user:req.user, folders:[], files:fl})
        }
        else{ // if nothing in home directory
            console.log("works.");
            res.render('dashboard', {user: req.user, folders :fd, files:fl})
        }
    }
    else{
        const parentFolderID = req.session.parentFolderID;
        const subfd = await folders.getSubfoldersByID(parseInt(parentFolderID));
        const subfiles = await files.getFilesByID(parentFolderID);
        res.render("dashboard",{
            user: req.user, 
            folders: subfd, files: subfiles
        })
    }
}
    

exports.routeLocation = async(req,res,next)=>{

    const fd = await folders.getFoldersByID(req.user.id);
    const fl = await files.getFilesByID(null);

    if ( res.locals.location === "/dashboard"){
        if ( !fd || fd.length === 0){ 
            res.render("dashboard", {user:req.user, folders:[], files:fl})
        }
        else{ 
            res.render('dashboard', {user: req.user, folders :fd, files: fl})
        }
    }

    else{
        const fl = await files.getFilesByID(req.session.parentFolderID);
        const parentFolderID = req.session.parentFolderID;
        const subfd = await folders.getSubfoldersByID(parseInt(parentFolderID));
        res.render("dashboard",{
            user: req.user, 
            folders: subfd, 
            files:fl
        })
    }

}