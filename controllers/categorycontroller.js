const {response} = require('express')
const Category = require('../models/categoriasschema')

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
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        mensage : 'Peticion GET USANDO CONTROLADOR',
        message : 'Request GET USING CONTROLLER',
        Total,
        Categorias

    })

}

//  Obtener Categoria Especifica
const GetIdCategory = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    const categoria = await Category.findById(id).populate('user', 'name')

    res.json({

        categoria
    })

}


const PostCategoria = async(req, res= response) => {

    const { name } = req.body

    const CategoriaDb = await Category.findOne({ name} )

    if (CategoriaDb){
        res.status(400).json({
            msg : `Categoria: ${name} ya existe`
        })
    }

    //  Generar la data a guardar
    const data = {
        name,
        //  El modelo de usuario lo regresamos como user en modelos de usuarios linea 58
        user : req.user._id
    }

    const categoria = await new Category(data)

    //  Guardar DB
    await categoria.save()


    res.status(201).json(categoria)

}

const PutCategory = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const {_id , estado, user , ... data} = req.body

    data.name = data.name.toUpperCase()

    data.user = req.user._id

    //  Busca el ID y con los datos actualizalos
    const category = await Category.findByIdAndUpdate(id, data, {new : true})

    res.json({
        category
    })
}


const DeleteCategory = async(req, res = response) => {

    const {id} = req.params

    const category = await Category.findByIdAndUpdate(id, {estado : false}, {new : true})

    res.status(200).json({
        category
    })

}



module.exports = {
    CategoryController,
    PostCategoria,
    GetCategoria,
    GetIdCategory,
    PutCategory,
    DeleteCategory
}