const { User } = require('../db/db');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token.service')
const validate = require('../services/validator.service');

const userController = {

    // Crear usuario ----------------------------------------------------------
    async create(req, res) {

        let data = req.body;

        // valido datos enviados
        let checkdata = validate.create(data);
        if (checkdata.status) {

            // valido que el usuario no exista
            const checkUser = await User.findOne({ where: { username: data.username } })
            if (!checkUser) {

                // encripto el pass y guardo en la base
                data.password = await bcrypt.hash(data.password, 10);
                data.money = data.money.toLowerCase();
                const result = await User.create(data);

                return res.status(200).json({ 'user': result });

            } else {
                return res.status(400).json({ 'error': 'username ya existente' });
            }
        } else {
            let msg = checkdata.info;
            return res.status(400).json({ 'error': msg });
        }
    },


    // login ------------------------------------------------------------------
    async login(req, res) {

        const data = req.body;

        // obtengo usuario de la base desde su username
        const userData = await User.findOne({
            where: { username: data.username }
        })

        if (userData) {

            // chequeo que el pass sea correcto
            let checkpass = await bcrypt.compare(data.password, userData.password);

            if (checkpass) {
                // genero token
                let getToken = await tokenService.create(userData);
                let username = userData.username
                return res.status(200).json({ 'username': username, 'token': getToken });

            } else {
                return res.status(403).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            return res.status(403).json({ error: 'Credenciales incorrectas' });
        }
    },

    // remove ------------------------------------------------------------------
    async remove(id) {
        //.......
    },


}

module.exports = userController;