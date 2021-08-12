//  Requerimentos de Express
const { response } = require('express')

//  Encriptar Contraseña usamos paquete Bcrypt
const bcryptjs = require('bcryptjs')

//  Modelo de Esquema "USUARIO" Mongose
const Usuario = require('../models/usuario')



const get = async(req, res = response) => {

    //  Argumentos Opcionales del Query
    const {limit = 2, since = 0} = req.query

    //  Devuelve un query
    const [Total, Usuarios] = await Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({estado : true})
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({

        msg: 'Controlador GET de Usuarios',
        Total,
        Usuarios

    })
}

const post = async(req, res = response) => {

    //  Parametros sumistrados en el BODY
    const {name, email, password , rol} = req.body;

    //  Peticiones del Body se introduce al Modelo
    const usuario = new Usuario({name, email, password , rol});

    //  Encriptar Contraseña Hash
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //  Salvar en Base de datos
    await usuario.save();

    res.json({

        message : ' Metodo Post para Creacion de Usuarios ',
        usuario

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
    const usuario = await Usuario.findByIdAndUpdate(id , resto)

    res.json({

        mensage : ' Actualizacion de Usuario ',
        usuario

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

    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false})

    //  Usuario Auntenticado -> Tiene todos los datos de Quien fue que hizo la Accion de Borrar
    const userauth = req.usuario

    res.json({
        mensage : ' Borrar Usuario ',
        usuario
    })
}



module.exports = {
    get,
    put,
    patch,
    delet,
    post
}