const { User } = require('../db/db');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token.service')
const { validateLogin } = require('../services/validator.service');

const userController = {

    // Crear usuario
    async create(req, res) {

        let data = req.body;
        let validate = validateLogin(data);
        if (validate.status) {

            data.password = await bcrypt.hash(data.password, 10);

            const result = await User.create(data);

            return res.status(200).json({ 'user': result });

        } else {
            let msg = validate.info;
            return res.status(400).json({ 'error': msg });
        }


    },

    async remove(id) {
        //.......
    },

    // login --------------------------
    async login(req, res) {

        const data = req.body;

        // obtengo usuaro de la base desde su username
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
    }

}

module.exports = userController;