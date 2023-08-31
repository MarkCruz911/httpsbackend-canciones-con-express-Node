const mongoose = require("mongoose");

const dbConnectNoSql = () => {
    const DB_URI = process.env.DB_URI;
    console.log("hola")
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>
        console.log("CONECTADO CORRECTAMENTE")
    ).catch((err) => { console.log(err); })
};


module.exports = dbConnectNoSql;