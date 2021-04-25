const validate = {
    create(data) {

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

    login(data) {
        //faltan validaciones
    },

}

module.exports = validate;