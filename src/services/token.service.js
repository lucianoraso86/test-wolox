const configJWT = require('../config/config-jwt');
const JWT = require('jsonwebtoken');


const token = {

    // crea token ------------------------
    async create(userData) {
        var token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (configJWT.timeExpire * 300),
            usuario: {
                id: userData.id,
                username: userData.username
            }
        }, configJWT.secret);
        return token;
    },

    // valida token -----------------------
    async validate(token) {
        try {
            var tokenPayload = await JWT.verify(token, configJWT.secret);
            return {
                usuario: {
                    id: tokenPayload.usuario.id,
                    username: tokenPayload.usuario.username
                }
            }
        } catch (er) {
            return false;
        }
    }

}


module.exports = token;