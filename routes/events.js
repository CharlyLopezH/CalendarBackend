
const { Router } = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento,actualizarEvento, eliminarEvento, }=require('../controllers/events');

const router=Router();

/*
Event routes
/api/events
*/ 

//Si no mandamos el token no funciona, tienen que pasar por su validación
router.use(validarJWT);

//Obtener Eventos
console.log('rutas de Eventos');
router.get('/',getEventos);

//Crear evento
router.post('/', crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;