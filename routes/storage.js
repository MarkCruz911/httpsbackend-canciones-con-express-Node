const multer = require("multer");
const express = require("express");
const {request} = require("express");
const router = express.Router();
const uploadMiddleware=require("../utils/handleStorage")
const {createItems} = require("../controllers/storage")
const {getItems, getItem, deleteItems} = require("../controllers/storage");
const {validatorGetItem}= require("../validator/storage");


router.get("/",getItems);
router.get("/:id",validatorGetItem,getItem);
router.delete("/:id",validatorGetItem,deleteItems);

router.post("/", uploadMiddleware.single("myfile"), createItems);

module.exports = router;