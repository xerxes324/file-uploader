exports.signupHandler = (err,req,res,next) =>{
    console.log(typeof(err),'is the type');
    res.render("signup", {errors : 
        typeof(err.message) === "string" ? err.message : err
    })
}

exports.loginHandler = (err,req,res,next) => {
    console.log(err);
    console.log(typeof(err));
    res.render("login", {errors: err.message})
}