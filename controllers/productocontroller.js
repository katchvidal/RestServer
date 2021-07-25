const { response } = require("express");
const Productos = require('../models/productoschema')


const GetProducto = async(req, res = response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query
    const query = ({estado : true});

    //  Devuelve un query
    const [Total, Items] = await Promise.all([
        Productos.countDocuments(query),
        Productos.find(query)
            .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        mensage : 'Peticion GET USANDO CONTROLADOR',
        message : 'Request GET USING CONTROLLER',
        Total,
        Items

    })

}

const GetProductoId = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    const producto = await Productos.findById(id)
                                            .populate('user', 'name')
                                            .populate('data' , 'name')

    res.json({

        producto
    })


}



const CrearProducto = async(req, res = response) => {

    //  Nombre recibido en el Body
    const { estado , user , ... body } = req.body

    //  Buscalo en la base de datos
    const ProductosDB = await Productos.findOne({ body })


    //  Si ya existe....
    if (ProductosDB){
        res.status(400).json({
            msg : `Producto: ${name} ya existe`
        })
    }

    //  Generar la data a guardar
    const data = {
        ...body,
        name : body.name.toUpperCase(),
        //  El modelo de usuario lo regresamos como user en modelos de usuarios linea 58
        user : req.user._id,
    }

    const producto = await new Productos(data)

    //  Guardar DB
    await producto.save()

    res.json({
        msg : 'Producto Creado',
        producto
    })

}


const ActualiazarProducto = async(req, res = response) => {

        //  Recibir Parametros
        const {id} = req.params;

        //  Parametros que excluimos y cuales si apuntamos
        const {_id , estado, user , ... data} = req.body

        if(data.name){
            
            data.name = data.name.toUpperCase()

        }
    
        data.user = req.user._id
    
        //  Busca el ID y con los datos actualizalos
        const producto = await Productos.findByIdAndUpdate(id, data, {new : true})
    
        res.json({
            producto
        })


}



const BorrarProducto = async(req, res = response) => {

    const {id} = req.params

    const producto = await Productos.findByIdAndUpdate(id, {estado : false}, {new : true})

    res.status(200).json({
        producto
    })

}





module.exports = {
    GetProducto,
    GetProductoId,
    CrearProducto,
    ActualiazarProducto,
    BorrarProducto
}