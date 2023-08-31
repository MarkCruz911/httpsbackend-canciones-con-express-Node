const customHeader = (req,res,next)=>{
    try{
        const apikey = req.headers.api_key;
        console.log(apikey);
        if(apikey === 'hola soy mark'){
            next();
        }else{
            res.status(403);
            res.send({error:"la api key no es correcta"})
        }


    }catch (e){
        res.status(403);
        res.send({error:"Algo Ocurrio en el Customer Header"})
    }
}

module.exports = customHeader;

