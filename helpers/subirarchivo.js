
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const subirarchivo = (files, ValidExt = ['pdf', 'jpeg', 'txt', 'gif', 'jpg'], folder = '') => {

    return new Promise((resolve , reject ) => {

        //  Recibo el ARCHIVO/FILES
        const {archivo} = files

        //  Saber que extension es un archivo para luego validarlas
        const namesplit = archivo.name.split('.')
        const extension = namesplit[ namesplit.length -1]
        
    
        //  Extensiones Permitidas
        if(!ValidExt.includes(extension)){

            return reject(`la extension: ${extension} no esta permitida, validas son: ${ValidExt}`)
        }
    
        //  Darle un ID UNICO A CADA ARCHIVO
        const temp = uuidv4()+ '.'+ extension;
        //  Ubicacion de la carpeta donde se van a guardar los archvos cargados
        const uploadPath = path.join(__dirname , '../uploads/', folder , temp);
      
        archivo.mv(uploadPath,(err) => {
          if (err) {

            reject(err)

          }
      
        resolve(temp)

        });


    })


}

module.exports = {
    subirarchivo
}