const {response} = require('express')
const Categoria = require('../models/categoria')

const CategoryController = async(req, res = response) =>{

    res.json({
        msg: 'Controlador Category'
    })

}


const GetCategoria = async(req, res= response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query
    const query = ({estado : true});

    //  Devuelve un query
    const [Total, Categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        mensage : 'Get Categorias',
        Total,
        Categorias

    })

}

//  Obtener Categoria Especifica
const GetIdCategory = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate( 'usuario', 'name' )

    res.json({
        mensage : 'Get Categorias por ID',
        categoria
    })

}


const PostCategoria = async(req, res= response) => {

    //  Convertir Nombre a Mayuscualas
    const name = req.body.name.toUpperCase();
    
    //  Busque si Existe un Nombre igual
    const CategoriaDb = await Categoria.findOne({ name} )

    //  Si Ya Existe Retorna un Status 400
    if (CategoriaDb){

        return res.status(400).json({

            msg : ` La Categoria: ${CategoriaDb.name} ya existe `

        })

    }

    //  Generar la data a guardar
    const data = {
        name,
        //  El modelo de usuario lo regresamos como usuario en modelos de usuarios linea 58
        usuario : req.usuario._id
    }

    //  Llenar Categoria
    const categoria = await new Categoria(data)

    //  Guardar DB
    await categoria.save()

    //  Enviar Respuesta
    res.status(201).json(categoria)

}

const PutCategory = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const {_id , estado, usuario , ... data} = req.body

    //  Apuntamos a hacer el nombre a Mayusculas
    data.name = data.name.toUpperCase()

    //  Usuario que esta haciendo el UPDATE -> ACTUALIZANDO
    data.usuario = req.usuario._id

    //  Busca el ID y con los datos actualizalos
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new : true})

    res.json({
        categoria
    })
}


const DeleteCategory = async(req, res = response) => {

    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate( id, {estado : false}, {new : true} )

    res.status(200).json({

        categoria

    })

}



module.exports = {

    PostCategoria,
    GetCategoria,
    GetIdCategory,
    PutCategory,
    DeleteCategory

}