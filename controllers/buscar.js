const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')


const ColeccionesPermitidas = [

    'categorias',
    'productos',
    'roles',
    'usuarios'

]

//  Tipo de Busqueda Usuarios
const buscarusuarios = async(termino = '' , res = response) =>{

    //  MongoID validos
    const MongoId = ObjectId.isValid( termino )

    if ( MongoId ){

        //  Buscar en la -> Base de datos por MongoID
        const usuario = await Usuario.findById( termino )

        //  Regresa un objeto -> Pero en un Arreglo -> Si no lo Encuentras pero es MongoID valido regresa un arreglo vacio
        return res.json({

            //  Ternario -> usuario existe -> Rregresa Arreglo -> No existe regresa arreglo vacio
            resultado : ( usuario ) ? [ usuario ] : []

        })

    }

    //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
    const regex = RegExp( termino, 'i')

    //  Busca en la base de datos un termino igual a ...
    const usuario = await Usuario.find({

         $or : [{ name : regex }, { email : regex}],

         $and : [{ estado : true }]

    })

    res.json({

        resultado : usuario

    })

}

const buscarcategorias = async(termino = '', res = response) => {

    //  MongoID validos
    const MongoId = ObjectId.isValid( termino )

    if (MongoId){

        //  Buscalo en la base de datos -> MongoID
        const categoria = await Categoria.findById( termino ).populate('usuario', 'name')

        return res.json({

            //  Ternario -> Categoria Existe -> Regresalo en un Arreglo -> No existe Regresa un Arreglo Vacio
            results : ( categoria ) ? [ categoria ] : []

        })
    }

    //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
    const regex = RegExp( termino, 'i' )

    //  Busca en la base de datos un termino igual a ...
    const categorias = await Categoria.find({ name : regex , estado : true})

    res.json({

        resultado : categorias

    })



}



const buscarproductos = async(termino = '', res = response) =>{

        //  MongoID validos
        const MongoId = ObjectId.isValid(termino)

        if (MongoId){
            
            //  Buscalo -> En la base de datos por MongoID
            const producto = await Categoria.findById(termino).populate('categoria', 'name').populate('usuario', 'name')

            return res.json({

                //  Existe -> Objeto -> Regresalo en un Arreglo -> No existe Regresalo en un Arreglo Vacio
                results : ( producto ) ? [ producto ] : []

            })
        }
    
        //  Expresion regular para que el termino nos venga en mayuscula haga match con uno parecido
        const regex = RegExp(termino, 'i')
    
        //  Busca en la base de datos un termino igual a ...
        const productos = await Producto.find({name : regex , estado : true}).populate('categoria', 'name').populate('usuario', 'name')
    
        res.json({

            resultado : productos

        })
}


const buscar = async(req, res = response) => {

    const { coleccion , termino } = req.params

    if( !ColeccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg : ` la coleccion ${coleccion} no es un coleccion permitida: ${ColeccionesPermitidas} `
        })
    }

    //  La LLave ( Key ) -> Coleccion
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