const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/usuarioschema')

const validatejwt = async(req, res = response, next) => {

    //  Recoger el JWT del Header
    const token = req.header('token');

    //  Si no hay token no hay autorizacion
    if(!token){
        return res.status(401).json({
            msg : 'No token, No authorizen'
        })
    }

    try {

        //  Si viene el Token hay que comprarlo con token valido
        const { uid }  =  jwt.verify(token , process.env.SECRETORPRIVATEKEY)

        
        //  Buscamos el usuario authenticado
        const user = await User.findById(uid)

        //  Verificar que exista el usuario
        if(!user){
            return res.status(401).json({
                msg : 'Token no valido'
            })            
        }

        //  Verificar si el usuario esta activo/no activo
        if(!user.estado){
            return res.status(401).json({
                msg : 'Token No valido'
            })
        }


        //  Lo almacenamos en la request
        req.user = user

        //  Si todo es correcto continue las validaciones check() -> check().....
        next();
        
    } catch (error) {
        
        //  Si el token no es valido o esta modificado -> 
        console.log(error);
        res.status(401).json({
            msg : 'No Valid Token no Authorizen'
        })

    }

}

module.exports = {
    validatejwt
}