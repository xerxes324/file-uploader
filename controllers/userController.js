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
        const fl = await files.getFilesByID(null, req.user.id);
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
        const subfiles = await files.getFilesByID(parentFolderID, req.user.id);
        res.render("dashboard",{
            user: req.user, 
            folders: subfd, files: subfiles
        })
    }
}
    

exports.routeLocation = async(req,res,next)=>{

    const fd = await folders.getFoldersByID(req.user.id);
    const fl = await files.getFilesByID(null, req.user.id);

    if ( res.locals.location === "/dashboard"){
        res.redirect("/dashboard");
    }

    else{
        const fl = await files.getFilesByID(req.session.parentFolderID, req.user.id);
        const parentFolderID = req.session.parentFolderID;
        const subfd = await folders.getSubfoldersByID(parseInt(parentFolderID));
        res.redirect(`/foldercontents/?id=${req.user.id}`);
    }

}