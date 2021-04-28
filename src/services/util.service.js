const validate = {

    // validaciones al crear un usuario ---------------------------------------
    add(data) {

        if (!data.firstname || !data.lastname || !data.username || !data.password || !data.money) {
            return { 'status': false, 'info': 'campos incompletos' };
        }

        let regexpMoney = /^(USD|ARS|EUR|usd|ars|eur)$/;
        if (!regexpMoney.test(data.money)) {
            return { 'status': false, 'info': 'moneda no permitida' };
        }

        let regexpPass = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!regexpPass.test(data.password)) {
            return { 'status': false, 'info': 'el password debe contener al menos 8 caracteres alfanuméricos' };
        }

        return { 'status': true, 'info': 'ok' };

    },

    // validaciones al login --------------------------------------------------
    login(data) {
        if (!data.username || !data.password) {
            return { 'status': false, 'info': 'campos incompletos' };
        }

        return { 'status': true, 'info': 'ok' };
    },

}

const util = {

    // orden de array ---------------------------------------------------------
    dynamicSort(money, order) {
        return function(a, b) {
            let result = (a.current_price[money] < b.current_price[money]) ? -1 : (a.current_price[money] > b.current_price[money]) ? 1 : 0;
            return result * order;
        }
    },

    // limita cantidad de elementos de array ----------------------------------
    limitResult(result, limit) {

        if (result.length > limit) {
            result = result.slice(0, limit);
        }
        return result;
    }
}

module.exports = {
    validate,
    util
}