const { tracksModel } = require('../models')
const {handleHttpError} = require("../utils/handleError");
const {matchedData} = require("express-validator");
    /**
     * Obtener listas de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const getItems = async(req, res) => {
    try{
        const user=req.user;

        const data = await tracksModel.find({});
        res.send({ data,user });
    }catch (e){
        handleHttpError(res,'ERROR_GET:ITEMS');
    }

    }
    /**
     * Obtener un detalle de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id}=req;
        const data= await tracksModel.findById(id);
        res.send({data});
    }catch (e){
        handleHttpError(res,"ERROR_GET_ITEM")
    }

    }
    /**
     * insertar un registro a la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const createItems = async(req, res) => {
        try{
            const body = matchedData(req)

            const data = await tracksModel.create(body)

            res.send({ data });

        }catch (e){
            handleHttpError(res,'ERROR_UPDATE_ITEMS');
        }

};
/**
 * Actualizar un registro a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try{
        const {id,...body}=matchedData(req)
        console.log(id);
        console.log(body);
        console.log("antes de await")
        const data = await tracksModel.findOneAndUpdate(
            {_id:id}, body )
        console.log("antes");
        console.log(data);
        res.send({ data })
        console.log("despues");
    }catch (e){
        handleHttpError(res,'ERROR_CREANDO_ITEMS');
    }



    }
    /**
     * eliminar de la base de datos
     * @param {*} req 
     * @param {*} res 
     */
const deleteItems = async (req, res) => {
        try{
            req = matchedData(req);
            const {id}=req;
            const data= await tracksModel.delete({_id:id});
            res.send({data});
        }catch (e){
            handleHttpError(res,"ERROR_ELIMINAR_ITEM")
        }
}
module.exports = { getItems, getItem, createItems, updateItem, deleteItems };