const {response } = require('express')

const AdminRole = (req, res= response, next) =>{

    //  Buscar la Request del usuario en JSON WEB TOKEN -> Proviene de la Acciond de Generar un JWT donde el cada usuario genera una peticion
    if(!req.usuario){
        return res.status(500).json({
            msg : 'Se quire verificar el rol sin validar el token'
        })
    }

    const {rol, name } = req.usuario

    if(rol != 'Admin_Rol'){
        return res.status(401).json({
            msg : `${name} Dont have a Administrator Rol `
        })
    }

    next();

}


const AutorizadoRol = ( ...roles ) =>{

    return (req, res = response , next) => {

        //  Buscar la Request del usuario en JSON WEB TOKEN -> Proviene de la Acciond de Generar un JWT donde el cada usuario genera una peticion
        if(!req.usuario){

            return res.status(500).json({
                msg : 'Se quire verificar el rol sin validar el token'
            })
        }


        if(!roles.includes(req.usuario.rol)){

            return res.status(401).json({
                msg : `${req.usuario.rol} no es un rol valido`
            })
        }


        next();
    }




}


module.exports = {

    AdminRole,
    AutorizadoRol

}