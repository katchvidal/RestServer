const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");
const { validate } = require("../middlewares/validate");

//  MiddleWare Custom / Helpers
const { validaterol, AlreadyEmail, MongoUserId } = require("../helpers/databasevalidators");

//  Middleware
const { validatejwt } = require("../middlewares/validar-jwt");
const { AdminRole,  AutorizadoRol } = require("../middlewares/validateroles");

//  Funciones del Controlador
const { get, 
    put, 
    post, 
    delet, 
    patch } = require("../controllers/controller");


//  Contiene toda la Funcionalidad de Router
const router = Router();

                                                            //  Rutas de la API

//  Path, MiddleWare, Controller
router.get('/', get)

//  Path, MiddleWare, Controller
router.put('/:id', [
    check('id', 'No Valid ID').isMongoId(),
    check('id').custom(MongoUserId),
    check('rol').custom( validaterol ),
    validate
] , put)

//  Path, MiddleWare, Controller
router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required/ Minimun six letters').isLength({min : 6}).not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Not Valid Email').isEmail(),
    check('email').custom(AlreadyEmail),
    check('rol').custom( validaterol ),
    validate
],post)

//  Path, Middleware, Controller
router.delete('/:id', [
    validatejwt,
    //AdminRole,
    AutorizadoRol('Admin_Rol', 'User_Rol'),
    check('id', 'No Valid ID').isMongoId(),
    check('id').custom(MongoUserId),
    validate
], delet )

//  Path, MiddleWare, Controller
router.patch('/', patch)


module.exports = router;