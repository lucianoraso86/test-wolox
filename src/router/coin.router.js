const { Router } = require('express');
const router = Router();

const verifyToken = require('../middleware/validate-token');
const coinUserController = require('../controllers/coinuser.controller');


// lista todas las cyptos - valida token
router.get('', verifyToken, async(req, res) => {
    coinUserController.listAll(req, res);
});


module.exports = router;