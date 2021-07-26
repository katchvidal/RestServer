const { response } = require("express");
const { subirarchivo } = require("../helpers/subirarchivo");
const User = require('../models/usuarioschema')
const Producto = require('../models/productoschema')
const path = require('path')
const fs = require('fs')


const CargarArchivos = async(req, res = response) => {

  try {
    
    const path = await subirarchivo(req.files, undefined, 'Imagenes')
    res.json({

      name : path

    })

  } catch (error) {
    
    res.status(400).json({
      msg : 'Bad Request / Extension No Permitida'
    })
  }
  
}


const ActualizarImagen = async(req, res = response) => {

  const { id, coleccion } = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await User.findById(id)
      if (!modelo){
        return res.status(400).json({
          msg :'No existe un usuario con ese id'
        })
      }


    break;
    
    case 'productos':

      modelo = await Producto.findById(id)
      if (!modelo){
        return res.status(400).json({
          msg :'No existe un usuario con ese id'
        })
      }


    break;
    default: 
      res.status(500).json({msg :'Aun no esta listo las demas validaciones'})
  }


  //Limpiar Imagen Previa

  if (modelo.img) {

    const pathimg = path.join(__dirname, '../uploads/', coleccion,   modelo.img)

    if (fs.existsSync(pathimg)){

      fs.unlinkSync(pathimg)

    }


  }


  //  Line de Codigo para Subir Archivo -> Subir Archivo -> Helper
  const namefile = await subirarchivo(req.files, undefined, coleccion)

  //  Igualamos la propiedad de la base de datos -> Revisar Nombre en 
  modelo.img = namefile

  await modelo.save()

  res.json({

    modelo

  })


}



module.exports = {
    CargarArchivos,
    ActualizarImagen
}