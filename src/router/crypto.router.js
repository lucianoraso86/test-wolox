const { Router } = require('express');
const router = Router();

const cryptoController = require('../controllers/crypto.controller');

router.get('/list', async(req, res) => {
    cryptoController.list(req, res);
});





module.exports = router;