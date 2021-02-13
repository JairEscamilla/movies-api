const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');


app.use(express.json()); // Body parser

moviesApi(app);


app.listen(config.port, ()=> {
    console.log("Servidor corriendo en el puerto 3000");
});