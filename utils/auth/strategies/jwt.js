const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const UsersService = require('../../../services/users');
const { config } = require('../../../config/index');

passport.use(
    new Strategy({
        secretOrKey: config.authJwtToken,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()// Lo vamos a sacar del header como bearer token
    },
        async function (tokenPayload, cb) {
            const usersService = new UsersService();
            try {
                const user = await usersService.getUser({ email: tokenPayload.email });
                if (!user) {
                    return cb(boom.unauthorized(), false);
                }

                delete user.password;
                cb(null, { ...user, scopes: tokenPayload.scopes });
            } catch (error) {
                cb(error);
            }
        }
    )
)

