const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const { Schedule } = require('./ScheduleModel');

const ScheduleDone = sequelize.define('ScheduleDone', {
    scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    day: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            min: 1,
            max: 7,
            isInt: true,
        }
    },
    //createdAt by default
}, {tableName: 'schedulesDone'});

Schedule.hasMany(ScheduleDone, {as: "schedulesDone", foreignKey:"scheduleId"});
ScheduleDone.belongsTo(Schedule, {foreignKey: "scheduleId"});

module.exports = {
    ScheduleDone
};