const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');

const Solicitud = sequelize.define('Solicitud',{
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {tableName: 'solicitudes'});

module.exports = {
    Solicitud
};