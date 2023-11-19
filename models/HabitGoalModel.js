const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const { User } = require('./UserModel');

const HabitGoal = sequelize.define('HabitGoal', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 24],
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {tableName: 'habitGoals',
    indexes: [
        {
            unique: true,
            fields: ['userId', 'name']
        }
    ],
});

User.hasMany(HabitGoal, {as: "habitGoals", foreignKey:"userId"});
HabitGoal.belongsTo(User, {foreignKey: "userId"});

module.exports = {
    HabitGoal
};