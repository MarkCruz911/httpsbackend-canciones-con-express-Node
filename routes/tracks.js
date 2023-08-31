const express = require("express");
const {validatorCreateItem,validatorGetItem} = require("../validator/tracks");
const customHeader = require("../middleware/customHeader");
const {authMiddleware}=require("../middleware/session");
const router = express.Router();
const { getItems,getItem, createItems,updateItem,deleteItems } = require("../controllers/tracks")
const checkRol = require("../middleware/rol");

router.get("/",authMiddleware,getItems)
router.get("/:id",authMiddleware,validatorGetItem,getItem)
router.post("/", authMiddleware,checkRol(["admin"]),validatorCreateItem,createItems)
router.put("/:id", authMiddleware,validatorGetItem,validatorCreateItem,updateItem)
router.delete("/:id", authMiddleware,validatorGetItem,deleteItems)


module.exports = router