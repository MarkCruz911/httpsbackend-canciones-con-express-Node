const fs = require("fs")
const { storageModel } = require('../models')
const {handleHttpError} = require("../utils/handleError");
const {matchedData} = require("express-validator");
const PUBLIC_URL=process.env.PUBLIC_URL;
const MEDIA_PATH=`${__dirname}/../storage`;
    /**
     * Obtener listas de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const getItems = async(req, res) => {
    try{
        const data = await storageModel.find({})
        res.send({ data })
    }catch (e){
        handleHttpError(res,"ERROR_LIST_ITEMS")
    }

    }
    /**
     * Obtener un detalle de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const getItem = async (req, res) => {
        try{
            const {id}=matchedData(req);
            const data = await storageModel.findById(id);
            res.send({ data })
        }catch (e){
            handleHttpError(res,"ERROR_DETAIL_ITEM")
        }
    }
    /**
     * insertar un registro a la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const createItems = async(req, res) => {
    try{
        const {
            file
        } = req
        const fileData={
            filename:file.filename,
            url:`${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({ data })
    }catch (e){
        handleHttpError(res,"ERROR_CREATE_ITEM");
    }



};
/**
 * Actualizar un registro a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async (req, res) => {

    }
    /**
     * eliminar de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const deleteItems = async (req, res) => {
        try{
            const {id}=matchedData(req);
            const dataFile = await storageModel.findById(id);
            await storageModel.deleteOne(id);
            const {filename}=dataFile;
            const filePath = `${MEDIA_PATH}/${filename}`;
            console.log(filePath);
            fs.unlinkSync(filePath);
            const data = {
                filePath,
                delete:1
            }

            res.send({ data })
        }catch (e){
            handleHttpError(res,"ERROR_DETAIL_ITEM")
        }
}
module.exports = { getItems, getItem, createItems, updateItems, deleteItems };