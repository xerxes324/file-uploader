exports.signupHandler = (err,req,res,next) =>{
    res.render("signup", {errors : 
        typeof(err.message) === "string" ? err.message : err
    })
}

exports.loginHandler = (err,req,res,next) => {
    console.log(err);
    res.render("login", {errors: err.message})
}