const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const userMoviesApi = require('./routes/userMovies');
const authApi = require('./routes/auth');

const cors = require('cors');

app.use(express.json()); // Body parser
app.use(cors());

moviesApi(app);
userMoviesApi(app);
authApi(app);

// Catch error 404
app.use(notFoundHandler);

// Los middlewares de error siempre van al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, ()=> {
    console.log("Servidor corriendo en el puerto 3000");
});