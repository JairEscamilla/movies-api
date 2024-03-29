const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');
const passport = require('passport');
require('../utils/auth/strategies/jwt');

function userMoviesApi(app) {
    const router = express.Router();
    app.use('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/', passport.authenticate('jwt', { session: false }), validationHandler({ userId: userIdSchema }, 'query'), async (req, user, next) => {
        const { userId } = req.query;

        try {
            const userMovies = await userMoviesService.getUserMovies({ userId });
            resizeBy.status(200).json({
                data: userMovies,
                message: 'user movies listed'
            });

        } catch (error) {
            next(error);
        }
    });


    router.post('/', passport.authenticate('jwt', { session: false }), validationHandler(createUserMovieSchema), async function (req, res, next){
        const { body: userMovie } = req;

        try{
            const createdUserMovieId = await userMoviesService.createUserMovie(userMovie);
            res.status(201).json({
                data: createdUserMovieId,
                message: 'User movie created'
            });
        }catch(error){
            next(error);
        }
    });

    router.delete('/:userMovieId', passport.authenticate('jwt', { session: false }), validationHandler({ userMovieId: movieIdSchema }, 'params'), async (req, res, next)=> {
        const { userMovieId } = req.params;
        try {
            const deletedUserMovieId = await userMoviesService.deletedUserMovieId({
                userMovieId
            });

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'user movie deleted'
            });

        } catch (error) {
            next(error);
        }
    });

}

module.exports = userMoviesApi;