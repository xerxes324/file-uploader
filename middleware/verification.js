exports.guest = (req,res,next) =>{
    if ( req.user ){
        res.redirect("/dashboard");
    }
    else{
        next();
    }
}

exports.entry = (req,res,next) => {
    if ( req.user ){
        next()
    }
    else{
        res.redirect("/");
    }
}