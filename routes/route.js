const { Router } = require("express");

//  Funciones del Controlador
const { get, 
    put, 
    post, 
    delet, 
    patch } = require("../controllers/controller");

//  Contiene toda la Funcionalidad de Router
const router = Router();


//  Rutas

router.get('/', get)

router.put('/:id', put)

router.post('/', post)

router.delete('/:id', delet )

router.patch('/', patch)


module.exports = router;