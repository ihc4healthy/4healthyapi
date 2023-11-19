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
    progress: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 10,
        validate: {
            min: 0,
            max: 100,
            isInt: true,
        }
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