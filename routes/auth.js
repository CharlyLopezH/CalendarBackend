/*Rutas de Usuarios /Auth
 host + api
*/
const {Router} = require('express');
const router=Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');

// router.post('../api/auth',(request, response)=>{
//     response.json({
//         ok:true,
//         notOk: !true
//     })
// })

router.post('/', loginUsuario );
router.post('/new', crearUsuario );
router.get('/renew', revalidarToken );



module.exports = router;