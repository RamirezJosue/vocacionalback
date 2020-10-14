require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path')

const { dbConnection, cloudinaryConfig } = require('./database/config')


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Cloudinary
app.use('*', cloudinaryConfig);

// Base de datos
dbConnection();

// Vistas de la aplicacion apara enviar correo etc.
app.set('views', path.join(__dirname, './views'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/fecha', require('./routes/fecha'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/preguntas', require('./routes/preguntas'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});