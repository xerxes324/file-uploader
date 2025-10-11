const folders = require("../controllers/folderManager")

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
        if ( !fd || fd.length === 0){ //files in home dir
            res.render("dashboard", {user:req.user, folders:[]})
        }
        else{ // if nothing in home directory
            console.log("works.");
            res.render('dashboard', {user: req.user, folders :fd})
        }
    }
    else{
        const parentfolderID = req.query.id;
        const subfd = folders.getSubfoldersByID(parseInt(parentfolderID));
        res.render("dashboard",{
            user: req.user, 
            folders: subfd
        })
    }
}
    

exports.routeLocation = async(req,res,next)=>{
    console.log(res.locals.location, 'is the loc in route');

    if ( res.locals.location === "/dashboard"){
        const fd = await folders.getFoldersByID(req.user.id);
        console.log(fd,'is the folders.');
        if ( !fd || fd.length === 0){ //files in home dir
            res.render("dashboard", {user:req.user, folders:[]})
        }
        else{ // if nothing in home directory
            console.log("works.");
            res.render('dashboard', {user: req.user, folders :fd})
        }
    }

    else{
        const parentfolderID = req.query.id;
        const subfd = folders.getSubfoldersByID(parseInt(parentfolderID));
        res.render("dashboard",{
            user: req.user, 
            folders: subfd
        })
    }

}

// FIX REPETITIVE CODE FUNCTIONS LATER. 