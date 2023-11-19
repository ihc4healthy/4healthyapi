const { User } = require("./models/UserModel");
const { Goal } = require("./models/GoalModel");
const { Solicitud } = require("./models/SolicituModel");
const { Lesson } = require("./models/lessonModel")
const { Habit } = require("./models/HabitModel")
const { HabitGoal } = require("./models/HabitGoalModel")
const { Schedule } = require("./models/ScheduleModel")
const { CatHabits, Habits} = require("./models/habitsModel");

module.exports = {
    User,
    Goal,
    Solicitud,
    Lesson,
    HabitGoal,
    Habit,
    Schedule,
    Lesson,   
    CatHabits,
    Habits
};