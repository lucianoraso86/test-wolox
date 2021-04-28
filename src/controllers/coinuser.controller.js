const coinService = require('../services/coin.service');
const { util } = require('../services/util.service')
const { CoinUser } = require('../db/db');


const coinUserController = {

    // Metodo para listar -----------------------------------------------------
    async listAll(req, res) {

        // obtengo datos del crypto con la moneda del usuario
        const dataCoin = await coinService.getallCoin(req.user.money);

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

    },

    // Metodo para listar coins por usuario -----------------------------------
    async listUser(req, res) {

        // top N de lista de coins- maximo 25
        let limit = parseInt(req.query.top);
        if (!limit || limit > 25) {
            limit = 25;
        }

        // orden para el listado asc o desc
        let order = -1;
        if (req.query.order == "asc" || req.query.order == "ASC") {
            order = 1;
        }

        // obtengo datos del usuario y sus coins
        const userCoinData = await CoinUser.findAll({ where: { id_user: req.user.id } })

        // busco por cada item los datos de coins 
        let promises = [];
        userCoinData.forEach(async(item) => {
            promises.push(coinService.getCoinPromise(item.id_coin));
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

            // ordeno en lisado en base a la moneda del usuario y el orden
            result.sort(util.dynamicSort(req.user.money, order));

            // limito los resultados en base al top
            result = util.limitResult(result, limit)

            return res.status(200).json(result);

        }).catch((err) => {
            return res.status(404).json({ 'error': 'Error al obtener coins' + err });
        });

    },

    // Metodo para agregar crypto al usuario autenticado ----------------------
    async add(req, res) {

        if (!req.body.idcoin) {
            return res.status(404).json({ 'error': 'parametro no valido' });
        }

        // valido que coin existente
        const dataCoin = await coinService.getCoin(req.body.idcoin);

        if (dataCoin.id) {

            let coinUserData = {
                id_user: req.user.id,
                id_coin: dataCoin.id
            }

            // valido que la relacion usuario-coin no exista
            const checkUserCoin = await CoinUser.findOne({ where: coinUserData })
            if (!checkUserCoin) {

                const result = await CoinUser.create(coinUserData);
                return res.status(200).json({ 'coinuser': result });

            } else {
                return res.status(400).json({ 'error': 'relacion user-coin preexistente' });
            }
        } else {
            return res.status(404).json({ 'error': 'coin invalida' });
        }

    },

    // Metodo para remover crypto al usuario autenticado ----------------------
    async remove(req, res) {

        if (!req.body.idcoin) {
            return res.status(404).json({ 'error': 'parametro no valido' });
        }

        // valido que coin existente
        const dataCoin = await coinService.getCoin(req.body.idcoin);
        if (dataCoin.id) {

            let coinUserData = {
                id_user: req.user.id,
                id_coin: dataCoin.id
            }

            // elimina la relacion
            const result = await CoinUser.destroy({ where: coinUserData });
            return res.status(200).json({ 'relaciones eliminadas': result });

        } else {
            return res.status(404).json({ 'error': 'coin invalida' });
        }

    }

}

module.exports = coinUserController;