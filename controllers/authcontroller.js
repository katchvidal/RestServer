const {response} = require('express')
const Usuario = require('../models/usuarioschema')
const bcryptjs = require('bcryptjs')
const {generarJwt} = require('../helpers/generateJWT')
const { GoogleVerify } = require('../helpers/googleValidate')


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

const GoogleSignin = async(req, res = response) =>{
    
    const { id_token } = req.body

    
    try {

        const {name , email , img} = await GoogleVerify(id_token);
        
        //Correo ya existe?
        let usuario = await Usuario.findOne({email})

        if (!usuario) { 

            //  Craear Usuario
            const data = {

                name, 
                email,
                password : 'password',
                img,
                google : true

            }

            const usuario = new Usuario(data)
            await usuario.save()

        }

        //  Usuario Bloqueado en DB

        if(!usuario.estado){
            return res.status(401).json({
                msg : 'Hable con Administrador usuario bloqueado'
            })
        }

        //  Generar JWT
        const token = await generarJwt(usuario.id)

        res.json({
            msg : 'Google Sign in ok',
            usuario,
            token

        })

    } catch (error) {
        res.status(400).json({

            msg : 'Google Token no Valid'

        })
    }
    
}

module.exports = {
    logincontroller,
    GoogleSignin
}