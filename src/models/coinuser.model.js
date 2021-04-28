const { DataTypes } = require("sequelize");

// model para tabla coin_user
module.exports = (sequelize, type) => {
    return sequelize.define('coin_user', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_coin: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    });
}