const {Router} = require('express');
const userRouter = Router();
const controller = require("../controllers/userController");
const val = require("../middleware/validation");
const EH = require("../middleware/errorHandlers");
const queries = require("../queries/userQueries");
const pc = require("../controllers/passportConfig");
const passport = require('passport');
const verify = require("../middleware/verification");
const file = require("../controllers/fileManager");
const folder = require("../controllers/folderManager");

const multer = require('multer');
const upload = multer({dest :'uploads/'});

userRouter.get("/", verify.guest, controller.login);
userRouter.get("/signup",verify.guest, controller.signup);
userRouter.get("/dashboard", verify.entry, controller.dashboard);
userRouter.get("/logout", pc.autoLogout);
userRouter.get("/foldercontents",
        verify.entry,
        folder.displayFolderContents,
        controller.dashboard
    );
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


userRouter.post("/newfile",upload.single('avatar') ,file.validateFile, file.addFile)
//handler here -> for file size error catch

// userRouter.post("/newfolder/:")
userRouter.post("/newfolder", folder.addFolder,controller.routeLocation )


// fallback

userRouter.get("/*splat", (req,res)=>{
    // render the fallback page -> option to redirect to login ( / ) l
    console.log("error!");
})
module.exports = {userRouter};