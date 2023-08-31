const bcryptjs = require("bcryptjs");

/**
 *
 * @param {*} passwordPlain
 * **/


const encrypt= async (passwordPlain)=>{
    const hash = await bcryptjs.hash(passwordPlain,10);
    return hash;
};

const compare = async (passwordPlain,hashPassword)=>{
    return await bcryptjs.compare(passwordPlain,hashPassword)
}



module.exports = {encrypt,compare};

