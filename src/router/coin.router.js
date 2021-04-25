const { Router } = require('express');
const router = Router();

const coinController = require('../controllers/coin.controller');

router.get('/list-all', async(req, res) => {
    coinController.listAll(req, res);
});

router.get('/list-user', async(req, res) => {
    coinController.listUser(req, res);
});


router.post('/add', async(req, res) => {
    coinController.add(req, res);
});


router.delete('/remove', async(req, res) => {
    coinController.remove(req, res);
});


module.exports = router;