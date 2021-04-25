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
    async listAll(req, res) {

        // valido token
        const validToken = await tokenService.validate(req.headers.token);
        if (validToken) {

            // obtengo datos del crypto con la moneda del usuario
            const dataCoin = await coinService.getallCoin(validToken.user.money);

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



    // Metodo para listar coins por usuario ----------------------------------
    async listUser(req, res) {

        // valido token
        const validToken = await tokenService.validate(req.headers.token);
        if (validToken) {

            // top N de lista de coins- maximo 25
            let top = parseInt(req.query.top);
            if (!top || top > 25) {
                top = 25;
            }

            // obtengo datos del usuario y sus coins
            const userCoinData = await CoinUser.findAll({ where: { id_user: validToken.user.id }, limit: top })

            // busco por cada item los datos de coins 
            let promises = [];
            userCoinData.forEach(async(item) => {
                promises.push(coinService.getCoin(item.id_coin));
            });

            // Espero que finalicen todas las peticiones y armo la respuesta
            await Promise.all(promises).then((response) => {

                let result = [];
                response.forEach((item, index) => {
                    let coin = {
                        "symbol": item.symbol,
                        "name": item.name,
                        "current_price": {
                            "ars": item.market_data.current_price.ars,
                            "usd": item.market_data.current_price.usd,
                            "eur": item.market_data.current_price.eur
                        },
                        "image": item.image,
                        "last_updated": item.last_updated
                    }
                    result.push(coin)
                });

                //console.log(validToken.user);  // aca ordenar array por moneda del usuario

                return res.status(200).json(result);

            }).catch((err) => {
                return res.status(403).json({ 'error': 'Error al obtener coins' });
            });

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
                    id_user: validToken.user.id,
                    id_coin: dataCoin.id
                }

                // valido que la relacion usuario-coin no exista
                const checkUserCoin = await CoinUser.findOne({ where: coinUserData })
                if (!checkUserCoin) {

                    const result = await CoinUser.create(coinUserData);
                    return res.status(200).json({ 'coinuser': result });

                } else {
                    return res.status(403).json({ 'error': 'relacion user-coin preexistente' });
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