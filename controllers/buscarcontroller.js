const { response } = require("express");
const {ObjectId} = require('mongoose').Types
const User = require('../models/usuarioschema')
const Category = require('../models/categoriasschema')
const Producto = require('../models/productoschema')


const ColeccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
]

//  Tipo de Busqueda Usuarios
const buscarusuarios = async(termino = '' , res = response) =>{

    //  MongoID validos
    const MongoId = ObjectId.isValid(termino)

    if (MongoId){

        const user = await User.findById(termino)
        return res.json({
            results : (user) ? [user] : []
        })
    }

    //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
    const regex = RegExp(termino, 'i')

    //  Busca en la base de datos un termino igual a ...
    const users = await User.find({
         $or : [{name : regex }, {email : regex}],
         $and : [{estado : true}]
    })

    res.json({
        result : users
    })

}

const buscarcategorias = async(termino = '', res = response) => {

    //  MongoID validos
    const MongoId = ObjectId.isValid(termino)

    if (MongoId){

        const categoria = await Category.findById(termino)
        return res.json({
            results : (categoria) ? [categoria] : []
        })
    }

    //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
    const regex = RegExp(termino, 'i')

    //  Busca en la base de datos un termino igual a ...
    const categorias = await Category.find({name : regex , estado : true})

    res.json({
        result : categorias
    })



}



const buscarproductos = async(termino = '', res = response) =>{

        //  MongoID validos
        const MongoId = ObjectId.isValid(termino)

        if (MongoId){
    
            const producto = await Category.findById(termino).populate('categoria', 'name')
            return res.json({
                results : (producto) ? [producto] : []
            })
        }
    
        //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
        const regex = RegExp(termino, 'i')
    
        //  Busca en la base de datos un termino igual a ...
        const productos = await Producto.find({name : regex , estado : true}).populate('categoria', 'name')
    
        res.json({
            result : productos
        })
}


const buscar = async(req, res = response) => {

    const { coleccion , termino } = req.params

    if(!ColeccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg : `las colecciones son: ${ColeccionesPermitidas}  `
        })
    }

    switch (coleccion) {
        case 'usuarios': 
            buscarusuarios(termino, res) 
        break;
        case 'productos':
            buscarproductos(termino, res)
        break;
        case 'categorias':
            buscarcategorias(termino, res)
        break;
    
        default: 
            res.status(500).json({
                msg : 'Se le olvido hacer esta busqueda'
            })
    }  

}


module.exports = {
    buscar
}