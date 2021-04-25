const configJWT = require('../config/config-jwt');
const JWT = require('jsonwebtoken');


const token = {

    // crea token ------------------------
    async create(userData) {
        var token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (configJWT.timeExpire * 300),
            user: {
                id: userData.id,
                username: userData.username,
                money: userData.money
            }
        }, configJWT.secret);
        return token;
    },

    // valida token -----------------------
    async validate(token) {
        try {
            var tokenPayload = await JWT.verify(token, configJWT.secret);
            return {
                user: {
                    id: tokenPayload.user.id,
                    username: tokenPayload.user.username,
                    money: tokenPayload.user.money,
                }
            }
        } catch (er) {
            return false;
        }
    }

}


module.exports = token;