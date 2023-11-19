const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const { HabitGoal } = require('./HabitGoalModel');

const Habit = sequelize.define('Habit', {
    habitGoalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 16],
        }
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'face-smile-beam',
        validate: {
            len: [3, 24],
        }
    },
    reminders: {
        type: DataTypes.ARRAY(DataTypes.TIME),
        allowNull: true,
    },
    difficulty: {
        type: DataTypes.ENUM('EASY', 'MEDIUM', 'HARD'),
        allowNull: false,
        defaultValue: 'MEDIUM',
    },
    goalPercentage: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 10,
    },
}, {tableName: 'habits',
    indexes: [
        {
            unique: true,
            fields: ['habitGoalId', 'name']
        }
    ],
});

HabitGoal.hasMany(Habit, {as: "habits", foreignKey:"habitGoalId"});
Habit.belongsTo(HabitGoal, {foreignKey: "habitGoalId"});

module.exports = {
    Habit
};