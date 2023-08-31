const {matchedData} = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword");
const {userModel} = require("../models");
const {handleHttpError}=require("../utils/handleError");
const {tokenSign} = require("../utils/handleJwt");
const {contains} = require("validator");
/**
 *  Este controlador es el encargado de registrar un usuario
 * @param {*}req
 * @param res
 * @returns {Promise<void>}
 */
const registerCtrl = async (req,res) => {
try{
    req=matchedData(req);
    const password=await encrypt(req.password);
    const body={...req,password}
    const dataUser = await userModel.create(body)
    dataUser.set("password",undefined,{strict:false});
    const data={
        token:await tokenSign(dataUser),
        user:dataUser
    }
    res.send({data})
}catch (e){
handleHttpError(res,"hay un error a la hora de registrar")
}


}
/**
 * Este controlador es el encagado de loguear a una persona
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const  loginCtrl=async (req,res)=>{
    try{
        req=matchedData(req);
        const user=await userModel.findOne({email:req.email}).select('password name role ');
        if(!user){
            handleHttpError(res,"USER_NOT_EXISTS",404)
            return
        }
        const hashPassword=user.get('password');
        const  check=await compare(req.password,hashPassword);
        console.log("paso passw");
        if(!check){
            handleHttpError(res,"PASSWORD_INVALID");
            console.log("paso???")
            return
        }
        user.set('password',undefined,{strict:false})
        const data ={
            token:await tokenSign(user),
            user
        }
        res.send({data})
    }catch (e){
        handleHttpError(res,"ERROR_LOGIN_USER");
}
}

module.exports={registerCtrl,loginCtrl}