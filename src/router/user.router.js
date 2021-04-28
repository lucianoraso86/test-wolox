const { Router } = require('express');
const router = Router();

const verifyToken = require('../middleware/validate-token');
const userController = require('../controllers/user.controller');
const coinUserController = require('../controllers/coinuser.controller');

// login
router.post('/login', async(req, res) => {
    userController.login(req, res);
});

// crear usuario
router.post('/add', async(req, res) => {
    userController.add(req, res);
});

// lista las cyptos del usuario logueado - valida token
router.get('/coins', verifyToken, async(req, res) => {
    coinUserController.listUser(req, res);
});

// agrega cyptos al usuario logueado - valida token
router.post('/coins', verifyToken, async(req, res) => {
    coinUserController.add(req, res);
});

// borra cyptos al usuario logueado - valida token
router.delete('/coins', verifyToken, async(req, res) => {
    coinUserController.remove(req, res);
});




module.exports = router;