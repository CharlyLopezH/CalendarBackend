/*Rutas de Usuarios 
  localhost:puerto/api/auth/ 
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');  
const {validarJWT}=require('../middlewares/validar-jwt');

const router=Router();

//Desestructuración de las funciones definidas en el controller, necesarias para la composición del ruteo

//Ruta para Crear
//http://localhost:4000/api/auth/new
router.post('/new',
            //middlewares
            [
            check('name','El nombre es obligatorio').not().isEmpty(),
            check('email','El email es obligatorio').isEmail(),
            check('password','Password obligatorio (+6 chars)').isLength({min:6}),            
            validarCampos,            
            ],                               
            crearUsuario);

//Login, ruta para Loggin
//http://localhost:4000/api/auth
router.post('/', 
            //middleware
            [
              check('email','El email es obligatorio').isEmail(),
              check('password','Password obligatorio').isLength({min:6}),
              validarCampos,                
            ],            
            loginUsuario );         
//Ruta para renovar el token
//http://localhost:4000/api/auth/renew (Nota:requiere x-token)             
router.get('/renew',validarJWT, revalidarToken );

module.exports = router;