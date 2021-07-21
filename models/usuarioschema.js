
const { Schema, model } = require('mongoose')


//  Modelo de USUARIO en Base de Datos de MongoDb
const UserSchema = Schema({

    name : {
        type : String,
        required : [true, 'Name is required'],

    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,

    },

    password : {
        type : String,
        required : [true, 'Password is required'],
    },

    img : {
        type : String

    },

    rol : {
        type : String,
        required : true,
        emun : ['Admin_Role', 'User_Role']
    },

    estado : {
        type : Boolean,
        default : true
    },

    google : {
        type : Boolean,
        default : false
    }

})


//  No devolver nunca los siguientes objetos de la base de datos
UserSchema.methods.toJSON = function(){
    const {__v, password, ... user} = this.toObject()
    return user
}



module.exports = model('Usuario', UserSchema);