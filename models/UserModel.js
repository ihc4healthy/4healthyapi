const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            len: [4, 16],
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull : true,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 32],
            notEmpty: true,
        }
    },
    type: {
        type: DataTypes.ENUM('WORK', 'STUDIES', 'ANY'),
        defaultValue: 'ANY',
    },
    profilePic: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 2,
        },
        defaultValue: 1,
    }
}, {tableName: 'users'});

module.exports = {
    User
};