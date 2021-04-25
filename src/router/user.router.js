const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');


// login
router.post('/login', async(req, res) => {
    userController.login(req, res);
});

// crear usuario
router.post('/create', async(req, res) => {
    userController.create(req, res);
});


// borrar usuario
router.put('/remove', async(req, res) => {
    //codigo ...........
});






module.exports = router;