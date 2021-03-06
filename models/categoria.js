
const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const CategoriaSchema = Schema({

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

    usuario : {
        //  Referencia a un Objeto en otra coleccion
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    
    }


})

//  No devolver nunca los siguientes objetos de la base de datos
CategoriaSchema.methods.toJSON = function(){
    const {__v, estado ,  ... data} = this.toObject()
  
    return data
}


module.exports = model('Categoria', CategoriaSchema);