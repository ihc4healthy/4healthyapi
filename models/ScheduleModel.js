const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const { Habit } = require('./HabitModel');

const Schedule = sequelize.define('Schedule', {
    habitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    days: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        validate: {
            validDays(value) {
                const nchecked = value.filter(v => v === true).length;
                if (nchecked < 1) {
                    throw new Error('Must select at least one day');
                }
                if (nchecked > 7) {
                    throw new Error('Invalid days check.');
                }
            }
        }
    }
}, {tableName: 'schedules'});

Habit.hasMany(Schedule, {as: "schedules", foreignKey:"habitId"});
Schedule.belongsTo(Habit, {foreignKey: "habitId"});

module.exports = {
    Schedule
};