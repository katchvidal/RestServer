const { Router } = require("express");

//  Controllers
const { 
    CrearProducto, 
    GetProducto, 
    GetProductoId,
     ActualiazarProducto, 
     BorrarProducto 
    } = require("../controllers/producto");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");
const { validatejwt } = require("../middlewares/validar-jwt");
const { validate } = require("../middlewares/validate");
const { ProductoExists } = require("../helpers/databasevalidators");
const { AdminRole } = require("../middlewares/validateroles");



//  Contiene toda la Funcionalidad de Router
const router = Router();


router.get('/', GetProducto)


//  Obtener categoria especifica con id
router.get('/:id', [

    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(ProductoExists),
    validate,

] , GetProductoId)

//  Path, MiddleWare, Controller
router.post('/', [
    validatejwt,
    check('name', 'Name is required').not().isEmpty(),
    validate
] , CrearProducto)


//  Actualizar Producto con token valido - Rol Administrador
router.put('/:id', [
    validatejwt,
    check('name' , 'Name is required').not().isEmpty(),
    check('id').custom(ProductoExists),
    validate,
] , ActualiazarProducto)


//  Borrar/Estado = False solo si tiene un rol de Administrador
router.delete('/:id', [
    validatejwt,
    AdminRole,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(ProductoExists),
    validate,
] , BorrarProducto)


module.exports = router;