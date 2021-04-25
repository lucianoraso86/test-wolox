const configApp = require('../config/config-app');
const config = require('../config/config-app');

const tokenService = require('../services/token.service')
const coinService = require('../services/coin.service');

const { User } = require('../db/db');
const { CoinUser } = require('../db/db');


const coinController = {

    // origen de datos CoinGecko ---------------------------------------------
    url: configApp.url,

    // Metodo para listar -----------------------------------------------------
    async list(req, res) {

        // valido token
        const validToken = await tokenService.validate(req.headers.token);
        if (validToken) {

            // obtengo datos del usuario para saber su money
            const userData = await User.findOne({ where: { id: validToken.usuario.id } })

            // obtengo datos del crypto con la money del usuario
            const dataCoin = await coinService.getallCoin(userData.money, 25, 'desc');

            const response = [];
            dataCoin.forEach((item, index) => {
                let coin = {
                    "id": item.id,
                    "symbol": item.symbol,
                    "name": item.name,
                    "current_price": item.current_price,
                    "image:": item.image,
                    "last_updated:": item.last_updated
                }
                response.push(coin)
            });

            return res.status(200).json(response);

        } else {
            return res.status(403).json({ 'error': 'token invalido' });
        }
    },


    // Metodo para agregar crypto al usuario autenticado ----------------------
    async add(req, res) {

        // valido token
        const validToken = await tokenService.validate(req.headers.token);
        if (validToken) {

            // valido que coin existente
            const dataCoin = await coinService.getCoin(req.body.coin);
            if (dataCoin.id) {

                let coinUserData = {
                    id_user: validToken.usuario.id,
                    id_coin: dataCoin.id
                }

                // valido que la relacion usuario-coin no exista
                const checkUserCoin = await CoinUser.findOne({ where: coinUserData })
                if (!checkUserCoin) {

                    const result = await CoinUser.create(coinUserData);
                    return res.status(200).json({ 'coinuser': result });

                } else {
                    return res.status(403).json({ 'error': 'relacion user-coin existente ' });
                }
            } else {
                return res.status(403).json({ 'error': 'coin invalida' });
            }
        } else {
            return res.status(403).json({ 'error': 'token invalido' });
        }
    },

    // Metodo para remover crypto al usuario autenticado ----------------------
    async remove(req, res) {
        // valido token
        const validToken = await tokenService.validate(req.headers.token);
        if (validToken) {

            // valido que coin existente
            const dataCoin = await coinService.getCoin(req.body.coin);
            if (dataCoin.id) {

                let coinUserData = {
                    id_user: validToken.usuario.id,
                    id_coin: dataCoin.id
                }

                // elimina la relacion
                const result = await CoinUser.destroy({ where: coinUserData });
                return res.status(200).json({ 'relaciones eliminadas': result });

            } else {
                return res.status(403).json({ 'error': 'coin invalida' });
            }
        } else {
            return res.status(403).json({ 'error': 'token invalido' });
        }
    }

}

module.exports = coinController;