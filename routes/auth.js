/*Rutas de Usuarios 
  localhost:puerto/api/auth/ 
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');  
const router=Router();

//Desestrucuración de las funciones definidas en el controller, necesarias para la composición del ruteo

//http://localhost:4000/api/auth/new
router.post('/new',
            //middlewares
            [
            check('name','El nombre es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').isEmail(),
            check('password','Password obligatorio').isLength({min:6}),            
            validarCampos,            ],                               
            crearUsuario );

//http://localhost:4000/api/auth/
router.post('/', 
            //middleware
            [
              check('email','El email es obligatorio').isEmail(),
              check('password','Password obligatorio').isLength({min:6}),
              validarCampos  
            ],
            
            loginUsuario );
          
router.get('/renew', revalidarToken );


module.exports = router;