const express = require('express');
require ('dotenv').config();
const { dbConnection } = require('./database/config');
console.log(process.env);

//Creación del Servidor
const app = express();

//Base de Datos
dbConnection();

//Definición del puerto de express para la escucha de peticiones
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}, endpoint principal /api/auth`);
})

//Public, directorio público
//Middleware
app.use(express.static('public'));

//Para lectura y parseo del Body
app.use(express.json());


// Rutas
//TODO: auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Eventos