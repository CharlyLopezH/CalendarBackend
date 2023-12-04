/*Rutas de Usuarios /Auth
 host + api
*/
const {Router} = require('express');
const {check} = require('express-validator');
const router=Router();

//Desestrucuración de las funciones definidas en el controller, necesarias para la composición del ruteo
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');

router.post('/', 
            //middleware
            [
              check('email','El email es obligatorio').not().isEmail(),
              check('password','Password obligatorio').not().isLength({min:6})  
            ],
            loginUsuario );


router.post('/new',
            //middleware
            [
            check('name','El nombre es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').not().isEmail(),
            check('password','Password obligatorio').not().isLength({min:6})
            ],            
            crearUsuario );


router.get('/renew', revalidarToken );


module.exports = router;