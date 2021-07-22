const {response } = require('express')

const AdminRole = (req, res= response, next) =>{

    //  Buscar la Request del usuario en JSON WEB TOKEN
    if(!req.user){
        return res.status(500).json({
            msg : 'Se quire verificar el rol sin validar el token'
        })
    }

    const {rol, name } = req.user

    if(rol != 'Admin_Rol'){
        return res.status(401).json({
            msg : `${name} Dont have a Administrator Rol `
        })
    }

    next();

}


const AutorizadoRol = ( ...roles ) =>{

    return (req, res = response , next) => {

        //  Buscar la Request del usuario en JSON WEB TOKEN
        if(!req.user){

            return res.status(500).json({
                msg : 'Se quire verificar el rol sin validar el token'
            })
        }


        if(!roles.includes(req.user.rol)){

            return res.status(401).json({
                msg : `${req.user.rol} no es un rol valido`
            })
        }


        next();
    }




}


module.exports = {

    AdminRole,
    AutorizadoRol

}