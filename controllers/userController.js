const folders = require("../controllers/folderManager")
const files = require("../controllers/fileManager")

exports.login= async(req,res,next) =>{
    console.log("hety");
    res.render("login", {errors: ""});
}

exports.signup = async(req,res,next) => {
    res.render("signup", {errors: []});
}

exports.dashboard = async(req,res,next) =>{
    
    const location = req.url;
    console.log(location, 'Is the window loc');

    if ( location === "/dashboard"){

        const fd = await folders.getFoldersByID(req.user.id);
        console.log(fd,'is the folders.');

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
        console.log('dashboard render id', parentFolderID);
        const subfd = await folders.getSubfoldersByID(parseInt(parentFolderID));
        const subfiles = await files.getFilesByID(parentFolderID);
        res.render("dashboard",{
            user: req.user, 
            folders: subfd, files: subfiles
        })
    }
}
    

exports.routeLocation = async(req,res,next)=>{
    console.log(res.locals.location, 'is the loc in route');
    // console.log(res.locals.)
    if ( res.locals.location === "/dashboard"){
        const fd = await folders.getFoldersByID(req.user.id);
        console.log(fd,'is the folders.');

        const fl = await files.getFilesByID(null);
        console.log(fl, "is the files");

        if ( !fd || fd.length === 0){ 
            res.render("dashboard", {user:req.user, folders:[], files:fl})
        }
        else{ // if nothing in home directory
            console.log("works.");
            res.render('dashboard', {user: req.user, folders :fd, files: fl})
        }
    }

    else{
        const fl = await files.getFilesByID(req.session.parentFolderID);
        console.log(fl, 'are the files');
        const parentFolderID = req.session.parentFolderID;
        console.log(parentFolderID,'is the query id');
        const subfd = await folders.getSubfoldersByID(parseInt(parentFolderID));
        // console.log('subfolders are :', subfd);
        res.render("dashboard",{
            user: req.user, 
            folders: subfd, 
            files:fl
        })
    }

}

// FIX REPETITIVE CODE FUNCTIONS LATER. 