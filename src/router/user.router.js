const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

// login
router.post('/login', async(req, res) => {
    userController.login(req, res);
});

// crear usuario
router.post('/add', async(req, res) => {
    userController.add(req, res);
});






module.exports = router;