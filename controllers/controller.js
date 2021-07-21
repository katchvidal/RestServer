const { response } = require('express')


const get = (req, res = response) => {

    //  Parsear Parametros y Recibirlos
    const query = req.query

    res.json({
        mensage : 'Peticion GET USANDO CONTROLADOR',
        message : 'Request GET USING CONTROLLER',
        query
    })
}

const post = (req, res = response) => {

    //  Parametros sumistrados en el BODY
    const {name = 'No Name', age} = req.body

    res.json({
        mensage : 'Peticion POST USANDO CONTROLADOR',
        message : 'Request POST USING CONTROLLER',
        name,
        age
    })

}

const put = (req, res = response) => {

    //  Recibir Parametros
    const {id} = req.params;

    res.json({
        mensage : 'Peticion PUT',
        message : 'Request PUT USING CONTROLLER',
        id
    })
}

const patch = (req, res = response) => {
    res.json({
        mensage : 'Peticion PATCH',
        message : 'Request PATCH USING CONTROLLER'
    })
}

const delet = (req, res = response) => {
    res.json({
        mensage : 'Peticion DELETE',
        message : 'Request DELETE USING CONTROLLER'
    })
}



module.exports = {
    get,
    put,
    patch,
    delet,
    post
}