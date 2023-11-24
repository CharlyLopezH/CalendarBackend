const express = require('express');
require ('dotenv').config();
console.log(process.env);

//Declaración del Servidor
const app = express();

//Definición del puerto de express para la escucha de peticiones
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})

//Public
//Middleware
app.use(express.static('public'));


// Rutas
//TODO: auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Eventos