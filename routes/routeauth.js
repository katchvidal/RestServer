const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");


//  Contiene todos los controladores
const { logincontroller } = require("../controllers/authcontroller");
const { validate } = require("../middlewares/validate");


//  Contiene toda la Funcionalidad de Router
const router = Router();


//  Path, MiddleWare, Controller
router.post('/login', [
    check('email', 'Email Required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate
] ,logincontroller)



module.exports = router;