const { response } = require("express");
const Producto = require('../models/producto')


const GetProducto = async(req, res = response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query
    const query = ({estado : true});

    //  Devuelve un query
    const [Total, Productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        msg : 'Get Productos - Obtener Todos los Productos',
        Total,
        Productos

    })

}

const GetProductoId = async(req, res = response) => {

    //  Recibir Parametros
    const { id } = req.params
    const producto = await Producto.findById( id ).populate('usuario' , 'name')

    res.json( producto )

}



const CrearProducto = async(req, res = response) => {

    //  Nombre recibido en el Body
    const { estado , usuario , ...body } = req.body

    //  Buscalo en la base de datos
    const productoDB = await Producto.findOne({  name : body.name })


    //  Si ya existe....
    if ( productoDB ){

        return res.status(400).json({

            msg : `El producto ${ productoDB.name } ya existe `

        })
    }

    //  Generar la data a guardar
    const data = {

        ...body,

        name : body.name.toUpperCase(),

        //  El modelo de usuario lo regresamos como user en modelos de usuarios linea 58
        usuario : req.usuario._id,

    }

    const producto = new Producto( data )

    //  Guardar DB
    await producto.save()

    res.status(201).json( producto )

}


const ActualiazarProducto = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const { estado, usuario , ... data} = req.body

    if ( data.name ) {

        data.name = data.name.toUpperCase()

    }

    data.usuario = req.usuario._id

    //  Busca el ID y con los datos actualizalos
    const producto = await Producto.findByIdAndUpdate(id, data, {new : true})

    res.json( producto )


}



const BorrarProducto = async(req, res = response) => {

    const {id} = req.params

    const producto = await Producto.findByIdAndUpdate( id , { estado : true }, { new : true } )

    res.status(200).json( producto )

}





module.exports = {
    GetProducto,
    GetProductoId,
    CrearProducto,
    ActualiazarProducto,
    BorrarProducto
}