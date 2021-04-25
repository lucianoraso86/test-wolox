const configDB = require('../config/config-db');
const { Sequelize } = require('sequelize');

// Models 
const UserModel = require('../models/user.models');
const CoinUserModel = require('../models/coin_user.model');

// Conexion a base de datos usando ORM
const sequelize = new Sequelize(
    configDB.name,
    configDB.username,
    configDB.password, {
        host: configDB.host,
        dialect: 'mysql',
        logging: false
    });


const User = UserModel(sequelize, Sequelize);
const CoinUser = CoinUserModel(sequelize, Sequelize);

// Sincronizo las tablas, si no existe la creo
sequelize.sync({ force: false })
    .then(() => {
        console.log("- db sincronizada exitosamente");
    })


module.exports = {
    User,
    CoinUser
}