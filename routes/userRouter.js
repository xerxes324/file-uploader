const {Router} = require('express');
const userRouter = Router();
const controller = require("../controllers/userController");
const val = require("../middleware/validation");
const EH = require("../middleware/errorHandlers");
const queries = require("../queries/userQueries");
const pc = require("../controllers/passportConfig");
const passport = require('passport');
const verify = require("../middleware/verification");
const addfile = require("../controllers/addFile");
const multer = require('multer');
const upload = multer({dest :'uploads/'});

userRouter.get("/", verify.guest, controller.login);
userRouter.get("/signup",verify.guest, controller.signup);
userRouter.get("/dashboard", verify.entry, controller.dashboard);
userRouter.get("/logout", pc.autoLogout);

//POSTS

userRouter.post("/signup",
    val.validateUsername,
    val.validateEmail,
    val.validatePassword,
    val.confirmPassword,
    val.passwordMatch,
    val.validateResult,
    queries.emailExists,
    queries.createUser,
    pc.autoLogin
)
userRouter.use(EH.signupHandler);


userRouter.post("/",
    passport.authenticate("local",{
        successRedirect:"/dashboard",
        failureRedirect : "/"
    })
)
userRouter.use(EH.loginHandler);


userRouter.post("/newfile",upload.single('avatar') ,addfile.newFile)

module.exports = {userRouter};