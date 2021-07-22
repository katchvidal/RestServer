const {response} = require('express')
const Usuario = require('../models/usuarioschema')
const bcryptjs = require('bcryptjs')
const {generarJwt} = require('../helpers/generateJWT')


const logincontroller = async(req, res = response) =>{

    const {password , email} = req.body;

    try {

        //  Verificar Email
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg : ' email or password are incorrect '
            })
        }

        //  Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg : ' email or password are incorrect '
            })
        }

        //  Verficar contraseña
        const validpass = bcryptjs.compareSync(password, usuario.password)
        if(!validpass){
            return res.status(400).json({
                msg : ' email or password are incorrect '
            })
        }
        //  Generar JWT
        const token = await generarJwt(usuario.id)


        res.json({
            msg : 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : 'Talk to BackDev something Wrong'
        })
    }


}


module.exports = {
    logincontroller
}