
/*
Event routes
/api/events
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const {isDate}=require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento,actualizarEvento, eliminarEvento, }=require('../controllers/events');

const router=Router();


//Si no mandamos el token no funciona, tienen que pasar por su validación
router.use(validarJWT);

//Obtener Eventos
console.log('rutas de Eventos');
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/new',     [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de fin').custom( isDate ),
    validarCampos
],
crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;