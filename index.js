const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//console.log(process.env);

//Creación del Servidor
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

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


// Definición de Rutas
//TODO: auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));

//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));