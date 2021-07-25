const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const ProductoSchema = Schema({

    name : {

        type : String,
        required : [true, 'Name is required'],
        unique : true

    },

    estado : {

        type: String,
        required : [true, 'Estado is required'],
        default : true
    },

    user : {

        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'User is required']
    },

    price : {

        type : Number,
        default : 0
    },

    category : {

        type : Schema.Types.ObjectId,
        ref : 'Categoria',
        required : true
    },

    descripcion : {
        type : String
    },

    disponible : {
        type : Boolean,
        default : true
    }

})

//  No devolver nunca los siguientes objetos de la base de datos
ProductoSchema.methods.toJSON = function(){
    const {__v, estado ,  ... data} = this.toObject()
  
    return data
}


module.exports = model('Producto', ProductoSchema);