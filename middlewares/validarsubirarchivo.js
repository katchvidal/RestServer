const { response } = require("express")



//  Middleware para Revisar que venga un archivo en la request
const ValidarArchivoSubir = (req, res = response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg :'No files were uploaded. - Validar Archivo'});
        return;
    }

    next();
    
}



module.exports = {
    ValidarArchivoSubir
}