require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morganBody=require("morgan-body");
const {IncomingWebhook,slackWebhook}=require("@slack/webhook");
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMySql}=require("./config/mySql")
const app = express();
const loggerStream=require("../apiRest/utils/handleLogger");

const ENGINE_DB=process.env.ENGINE_DB;
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
morganBody(app,{
    noColors:true,
    stream:loggerStream,
    skip:function (req,res){
        return res.statusCode<400
    }
});
const port = process.env.PORT
app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();
