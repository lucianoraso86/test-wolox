const configApp = require('../config/config-app');
const axios = require('axios');



const coinService = {

    url: configApp.coinURL,

    // obtiene las crypto, filtra por parametros ------------------------------
    async getallCoin(money, cant, order) {

        let response = await axios
            .get(coinService.url + '/coins/markets', {
                params: {
                    "vs_currency": money,
                    "per_page": cant,
                    "order": order
                }
            });


        return response.data;
    },

    // obtiene una crypto (valida que exista) ------------------------------
    async getCoin(id_coin) {
        try {
            let response = await axios
                .get(coinService.url + '/coins/' + id_coin);

            return response.data;

        } catch (err) {
            return { "error": "no encontrado" }
        }
    },

}


module.exports = coinService;