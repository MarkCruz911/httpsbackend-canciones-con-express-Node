const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
/**
 * debes de pasar el objeto del usuario
 * @param {*} user
 * @returns {Promise<void>}
 */
const tokenSign = async (user)=>{
const sign= jwt.sign(
    {
        _id:user._id,
        role:user._role
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    }
);
return sign
}

/**
 *debes de pasar el token de sesion el JWT
 * @param tokenJwt
 * @returns {Promise<null>}
 */

const verifyToken = async (tokenJwt)=>{
    try{
        return jwt.verify(tokenJwt,JWT_SECRET)
    }catch (e){
        return null
    }


}
module.exports={tokenSign,verifyToken}














