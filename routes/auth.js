const express = require("express");
const router = express.Router();
const {validatorRegister,validatorLogin}= require("../validator/auth")
const {registerCtrl,loginCtrl} = require("../controllers/auth");

router.post("/register",validatorRegister,registerCtrl);
router.post("/login",validatorLogin,loginCtrl);



module.exports = router