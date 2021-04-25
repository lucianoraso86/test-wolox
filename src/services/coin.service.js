const configApp = require('../config/config-app');
const axios = require('axios');



const coinService = {

    url: configApp.coinURL,

    // obtiene las crypto, filtra por parametros ------------------------------
    async getallCoin(money, cant, order, ids) {

        let params = { "vs_currency": money };
        cant != null ? params.per_page = cant : null;
        order != null ? params.order = "market_cap_" + order : params.order = 'market_cap_desc';
        ids != null ? params.ids = ids : null;

        //console.log(params);
        let response = await axios.get(coinService.url + '/coins/markets', { params });
        return response.data;
    },


    // obtiene datos de una crypto --------------------------------------------
    async getCoin(id_coin) {

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