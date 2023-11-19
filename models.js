const { User } = require("./models/UserModel");
const { Goal } = require("./models/GoalModel");
const { Solicitud } = require("./models/SolicituModel");
const { Lesson } = require("./models/lessonModel")
const { CatHabits, Habits} = require("./models/habitsModel");

module.exports = {
    User,
    Goal,
    Solicitud,
    Lesson,   
    CatHabits,
    Habits
};