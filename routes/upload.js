const { Router } = require("express");


//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");


//  MiddleWare Custom / Helpers
const { ColeccionesPermitidas } = require("../helpers/databasevalidators");


//  Middleware
const { validate } = require("../middlewares/validate");
const { ValidarArchivoSubir } = require("../middlewares/validarsubirarchivo");


//  Funciones del Controlador
const { CargarArchivos,  GetImage, ActualizarImagenCloudinary } = require("../controllers/upload");



//  Contiene toda la Funcionalidad de Router
const router = Router();

//  Rutas de la API

//  Path, MiddleWare, Controller
router.post('/', [
    ValidarArchivoSubir
], CargarArchivos)

router.put('/:coleccion/:id', [
    ValidarArchivoSubir,
    check('id', 'Id debe ser valido').isMongoId(),
    check('coleccion').custom(c => ColeccionesPermitidas(c, [ 'usuarios', 'productos' ])),
    validate
], ActualizarImagenCloudinary)


router.get('/:coleccion/:id' , [

    check('id', 'Id debe ser valido').isMongoId(),
    check('coleccion').custom(c => ColeccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validate

] , GetImage )

module.exports = router;