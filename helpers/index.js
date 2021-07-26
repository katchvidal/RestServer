

const databasevalidators    = require('./databasevalidators')
const generateJWT           = require('./generateJWT')
const googleValidate        = require('./googleValidate')
const subirarchivo          = require('./subirarchivo')


module.exports = {

    ...databasevalidators,
    ...generateJWT,
    ...googleValidate,
    ...subirarchivo

}