const { Router } = require('express');
const router = Router();

const coinController = require('../controllers/coin.controller');

router.get('/list', async(req, res) => {
    coinController.list(req, res);
});


router.post('/add', async(req, res) => {
    coinController.add(req, res);
});


router.delete('/remove', async(req, res) => {
    coinController.remove(req, res);
});


module.exports = router;