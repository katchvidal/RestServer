//  Requerimentos de Express
const { response } = require('express')

//  Encriptar Contraseña usamos paquete Bcrypt
const bcryptjs = require('bcryptjs')

//  Modelo de Esquema Mongose
const User = require('../models/usuarioschema')



const get = async(req, res = response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query

    //  Devuelve un query
    const [Total, Usuarios] = await Promise.all([
        User.countDocuments({estado : true}),
        User.find({estado : true})
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        mensage : 'Peticion GET USANDO CONTROLADOR',
        message : 'Request GET USING CONTROLLER',
        Total,
        Usuarios

    })
}

const post = async(req, res = response) => {

    //  Parametros sumistrados en el BODY
    const {name, email, password , rol} = req.body;

    //  Peticiones del Body se introduce al Modelo
    const user = new User({name, email, password , rol});

    //  Encriptar Contraseña Hash
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    //  Salvar en Base de datos
    await user.save();

    res.json({
        message : 'Request POST USING CONTROLLER FOR USER CREATE STATUS 200',
        user
    })

}

const put = async(req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    //  Parametros que excluimos y cuales si apuntamos
    const {_id , password , google , email , ... resto} = req.body

    // TODO: Validar Contra Base de Datos
    if (password){
        //  Encriptar Contraseña Hash
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    //  Busca el ID y con los datos actualizalos
    const user = await User.findByIdAndUpdate(id , resto)

    res.json({
        mensage : 'Peticion PUT',
        message : 'Request PUT USING CONTROLLER',
        user
    })
}

const patch = (req, res = response) => {
    res.json({
        mensage : 'Peticion PATCH',
        message : 'Request PATCH USING CONTROLLER'
    })
}

const delet = async(req, res = response) => {

    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, {estado : false})

    res.json({
        mensage : 'Peticion DELETE',
        message : 'Request DELETE USING CONTROLLER',
        user
    })
}



module.exports = {
    get,
    put,
    patch,
    delet,
    post
}