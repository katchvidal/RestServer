const { Router } = require("express");
const { buscar } = require("../controllers/buscar");



//  Contiene toda la Funcionalidad de Router
const router = Router();



//  Path, MiddleWare, Controller
router.get('/:coleccion/:termino', buscar)






module.exports = router;