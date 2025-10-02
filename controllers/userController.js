exports.login= async(req,res,next) =>{
    console.log("hety");
    res.render("login", {errors: ""});
}

exports.signup = async(req,res,next) => {
    res.render("signup", {errors: []});
}

exports.dashboard = async(req,res,next) =>{
    console.log(req.user,'is he');
    res.render("dashboard", {user: req.user});
}