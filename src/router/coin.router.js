const { Router } = require('express');
const router = Router();

const verifyToken = require('../middleware/validate-token');
const coinController = require('../controllers/coin.controller');


// lista todas las cyptos - valida token
router.get('/list-all', verifyToken, async(req, res) => {
    coinController.listAll(req, res);
});

// lista las cyptos del usuario logueado - valida token
router.get('/list-user', verifyToken, async(req, res) => {
    coinController.listUser(req, res);
});

// agrega cyptos al usuario logueado - valida token
router.post('/add', verifyToken, async(req, res) => {
    coinController.add(req, res);
});

// borra cyptos al usuario logueado - valida token
router.delete('/remove', verifyToken, async(req, res) => {
    coinController.remove(req, res);
});


module.exports = router;