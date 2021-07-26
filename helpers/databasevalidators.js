//  Modelo de Rol para Validar
const Rol = require('../models/rolschema')
const User = require('../models/usuarioschema')
const Category = require('../models/categoriasschema')
const Producto = require('../models/productoschema')

//  Funcionalidad de Validacion de Rol contra Base de datos
const validaterol =  async(rol = '') =>{

    const existsRol = await Rol.findOne({rol})
    if (!existsRol){
        throw new Error(`The Rol: ${rol} isnt valid`)
    }
        
}

//  Validacion de que Ya existe ese Email
const AlreadyEmail =  async(email = '') =>{
    
    const exists = await User.findOne({email})
    if (exists){
        throw new Error(`The Email: ${email} is already registered`)
    }

}


//  Validacion USUARIO POR ID
const MongoUserId = async(id) => {

    //  Buscalo por id
    const exists = await User.findById(id)

    //  Si no Existe Lanza un error
    if (!exists){
        throw new Error(`The id: ${id} Not Exists `)
    }
}

const CategoryExists = async(id) =>{

    //  Buscalo por id
    const existsCategory = await Category.findById(id)

    //  Si no Existe Lanza un error
    if (!existsCategory){
        throw new Error(`The id: ${id} Not Exists `)
    }


}

const ProductoExists = async(id) => {

    //  Buscalo por id
    const ExistsProducto = await Producto.findById(id)

    //  Si no Existe Lanza un error
    if (!ExistsProducto){
        throw new Error(`The id: ${id} Not Exists `)
    }

}


const ColeccionesPermitidas = async(coleccion = '', colecciones = []) => {

    const incluidas = colecciones.includes(coleccion)
    if (!incluidas){
        throw new Error(`la coleccion: ${coleccion} no es permitida `)
    }

    return true
}


module.exports= {

    validaterol,
    AlreadyEmail,
    MongoUserId,
    CategoryExists,
    ProductoExists,
    ColeccionesPermitidas

}