const configDB = require('../config/config-db');
const { Sequelize } = require('sequelize');

// Models 
const UserModel = require('../models/user.models');

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

// Sincronizo las tablas, si no existe la creo
sequelize.sync({ force: false })
    .then(() => {
        console.log("Table creada exitosamente.");
    })

module.exports = {
    User
}