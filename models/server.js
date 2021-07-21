const express = require('express')
const cors = require('cors')

class Server{
    
    //  Aqui declaramos las propiedades de la clase
    constructor() {
        
        //  Crea Servidor
        this.app = express();

        //  Puerto del Servidor
        this.PORT = process.env.PORT

        //  Path de Rutas
        this.RoutesPath = '/api'

        //  Middlewares
        this.middleware();

        //  Busca Todas las Rutas Disponibles
        this.routes();

    }

    //  Metodo de Middleware
    middleware(){

        //  Lectura y Parseo del Body
        this.app.use(express.json())

        //  CORS
        this.app.use(cors())

        //  Directorio Publico
        this.app.use(express.static('public'))
    }

    //  Metodo Rutas del Servidor Actual
    routes(){
        
        //  Cargamos todas las rutas
        this.app.use(this.RoutesPath, require('../routes/route'))

    }

    //  Metodo Servidor y sus Paramaetros
    listen(){

        this.app.listen(this.PORT, () =>{
            console.log(`Servidor en el puerto: 8080`)
        })

    }

}

module.exports = Server;