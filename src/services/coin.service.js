const axios = require('axios');

const coinService = {

    url: process.env.COIN_URL,

    // obtiene las crypto, filtra por parametros ------------------------------
    async getallCoin(money, cant, order, ids) {

        try {

            let params = { "vs_currency": money };
            cant != null ? params.per_page = cant : null;
            order != null ? params.order = "market_cap_" + order : params.order = 'market_cap_desc';
            ids != null ? params.ids = ids : null;

            let response = await axios.get(coinService.url + '/coins/markets', { params });
            return response.data;

        } catch (err) {
            return { "error": "no es posible obtener criptos" };
        }
    },

    // obtiene datos de una crypto --------------------------------------------
    async getCoin(id_coin) {

        try {
            let response = await axios.get(coinService.url + '/coins/' + id_coin);
            return response.data;
        } catch (err) {
            return { error: "error al obtener coin" }
        }
    },

    // obtiene datos de una crypto (retorna promesa) --------------------------
    async getCoinPromise(id_coin) {

        return new Promise(async function(resolve, reject) {
            try {
                let response = await axios.get(coinService.url + '/coins/' + id_coin);
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

}


module.exports = coinService;