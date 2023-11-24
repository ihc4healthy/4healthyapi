const { User } = require("./models/UserModel");
const { Goal } = require("./models/GoalModel");
const { Solicitud } = require("./models/SolicituModel");
const { Lesson,Question } = require("./models/lessonModel")
const { Habit } = require("./models/HabitModel")
const { HabitGoal } = require("./models/HabitGoalModel")
const { Schedule } = require("./models/ScheduleModel")
const { CatHabits, Habits} = require("./models/habitsModel");
const { ScheduleDone } = require("./models/ScheduleDoneModel")
const { Comment } = require("./models/CommentModel");

module.exports = {
    User,
    Goal,
    Solicitud,
    Lesson,
    Question,
    HabitGoal,
    Habit,
    Schedule,
    Lesson,   
    CatHabits,
    Habits,
    ScheduleDone,
    Comment,
};