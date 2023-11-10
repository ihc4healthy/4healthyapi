const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');

const Goal = sequelize.define('Goal', {
    name: {
        type: DataTypes.STRING,
        allowNull : true,
        allowNull: false,
        unique: true,

    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {tableName: 'goals'});

module.exports = {
    Goal
};