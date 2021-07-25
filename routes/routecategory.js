const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");
const { CategoryController, PostCategoria, GetCategoria, GetIdCategory, PutCategory, DeleteCategory } = require("../controllers/categorycontroller");
const { validaterol, CategoryExists } = require("../helpers/databasevalidators");
const { validatejwt } = require("../middlewares/validar-jwt");
const { validate } = require("../middlewares/validate");
const { AdminRole } = require("../middlewares/validateroles");


//  Contiene toda la Funcionalidad de Router
const router = Router();

//  Contiene todos los controladores

//  {{url}}/api/categorias


//  Obtener todas las Categorias
router.get('/', GetCategoria)


//  Obtener categoria especifica con id
router.get('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(CategoryExists),
    validate,
] , GetIdCategory)


//  Crear una nueva categoria con token valido
router.post('/', 
[
    validatejwt,
    check('name', 'Name is required').not().isEmpty(),
    validate
], PostCategoria)


//  Actualizar Categoria con token valido - Rol Administrador
router.put('/:id', [
    validatejwt,
    check('name' , 'Name is required').not().isEmpty(),
    check('id').custom(CategoryExists),
    validate,
] , PutCategory)


//  Borrar/Estado = False solo si tiene un rol de Administrador
router.delete('/:id', [
    validatejwt,
    AdminRole,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(CategoryExists),
    validate,
] , DeleteCategory)



module.exports = router