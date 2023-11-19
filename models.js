const { User } = require("./models/UserModel");
const { Goal } = require("./models/GoalModel");
const { Solicitud } = require("./models/SolicituModel");
const { Lesson } = require("./models/lessonModel")
const { Habit } = require("./models/HabitModel")
const { HabitGoal } = require("./models/HabitGoalModel")
const { Schedule } = require("./models/ScheduleModel")

module.exports = {
    User,
    Goal,
    Solicitud,
    Lesson,
    HabitGoal,
    Habit,
    Schedule,
};