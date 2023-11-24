const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');

const Comment = sequelize.define('Comment', {
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },

    title:{
        type: DataTypes.STRING,
        allowNull: false
    },

    content:{
        type: DataTypes.STRING,
        allowNull: false
    },

    image:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {tableName:'comments'});

module.exports ={
    Comment
};