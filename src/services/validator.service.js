module.exports = {
    validateLogin: function(data) {

        if (!data.firstname || !data.lastname || !data.username || !data.password || !data.money) {
            return { 'status': false, 'info': 'campos incompletos' };
        }

        //faltan validaciones

        return { 'status': true, 'info': 'ok' };

    },

    validateCreate: function(data) {
        //faltan validaciones
    },

}