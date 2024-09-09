const express=require("express")
const router=express.Router();
// middleware
const emailAndpasswordMiddleware=require("../middleware/EmailAndPasswordExist")
const varificationToken = require("../middleware/VerificationToken");

// controllers
const userFunctions=require("../controllers/user.controller")
// routes
router.post("/create-account", (req, res, next) => emailAndpasswordMiddleware(req, res, next, "register"), userFunctions.create_accout);
router.post("/login", (req, res, next) => emailAndpasswordMiddleware(req, res, next, "login"), userFunctions.login);
router.get("/",varificationToken.authenticationToken,userFunctions.getUser)


module.exports=router;