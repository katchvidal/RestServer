//  Modelo de Rol para Validar
const Rol = require('../models/role')
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

//  Funcionalidad de Validacion de Rol contra Base de datos
const validaterol =  async(rol = '') =>{

    const existsRol = await Rol.findOne({rol})
    if (!existsRol){
        throw new Error(`The Rol: ${rol} not valid`)
    }
        
}

//  Validacion de que Ya existe ese Email
const AlreadyEmail =  async(email = '') =>{
    
    const exists = await Usuario.findOne({email})
    if (exists){
        throw new Error(`The Email: ${email} is already registered`)
    }

}


//  Validacion USUARIO POR ID
const MongoUserId = async(id) => {

    //  Buscalo por id
    const exists = await Usuario.findById(id)

    //  Si no Existe Lanza un error
    if (!exists){
        throw new Error(`The id: ${id} Not Exists `)
    }
}

//  Validacion de Existe Categoria Por ID
const CategoryExists = async(id) =>{

    //  Buscalo por id
    const existsCategory = await Categoria.findById(id)

    //  Si no Existe Lanza un error
    if (!existsCategory){
        throw new Error(`El id: ${id} No Existe `)
    }

}

//  Validacion de Productos por ID
const ProductoExists = async(id) => {

    //  Buscalo por id
    const ExistsProducto = await Producto.findById(id)

    //  Si no Existe Lanza un error
    if (!ExistsProducto){
        throw new Error(`El id: ${id} No Existe `)
    }

}

//  Colecciones Permitidas
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