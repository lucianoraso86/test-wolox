const { DataTypes } = require("sequelize");

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