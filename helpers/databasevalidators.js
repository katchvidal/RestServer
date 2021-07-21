//  Modelo de Rol para Validar
const Rol = require('../models/rolschema')
const User = require('../models/usuarioschema')


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


module.exports= {
    validaterol,
    AlreadyEmail,
    MongoUserId
}