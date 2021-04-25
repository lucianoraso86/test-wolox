const tokenService = require('../services/token.service')

const cryptoController = {

    async list(req, res) {

        let response = await tokenService.validate(req.headers.token);

        if (response) {

            //aca hace lo que resta
            return res.status(200).json(response);

        } else {
            return res.status(403).json({ 'error': 'token inalido' });
        }
    }

}

module.exports = cryptoController;