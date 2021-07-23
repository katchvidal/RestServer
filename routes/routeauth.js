const { Router } = require("express");

//  MiddleWare Express Validator para hacer Validaciones
const { check } = require("express-validator");


//  Contiene todos los controladores
const { logincontroller, GoogleSignin } = require("../controllers/authcontroller");
const { validate } = require("../middlewares/validate");


//  Contiene toda la Funcionalidad de Router
const router = Router();


//  Path, MiddleWare, Controller
router.post('/login', [
    check('email', 'Email Required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validate
] ,logincontroller)


//  Path, MiddleWare, Controller
router.post('/google', [
    check('id_token', 'Id Token is Required').not().isEmpty(),
    validate
] , GoogleSignin)


module.exports = router;