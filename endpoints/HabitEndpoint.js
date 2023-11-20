const { Sequelize, Op } = require('sequelize');
const { HabitGoal, Habit, Schedule, ScheduleDone } = require('../models');
const { printDataError, printServerError } = require('../utils/printErrors');

const name = "/habit";
const nameCheck = name+"/check";

const defaultAdvanced = {
    goal: {
        name: "Vida saludable",
        description: "Mejorar mi calidad de vida"
    },
    difficulty: "MEDIUM",
    goalPercentage: 10,
};

HabitEndpoint = (app) => {
    // CREATE
    app.post(name, async (req, res) => {
        try {
            const userId = req.body?.userId;
            const baseHabit = req.body?.selectedHabit;
            const schedules = req.body?.schedules;
            if (!userId || !baseHabit || !schedules) {
                return printDataError(res, "user, habit and/or schedules")
            }
            
            const advanced = req.body?.advanced ?? defaultAdvanced;
            const habitGoal = advanced?.goal ?? defaultAdvanced.goal;
            
            const [hg, hgCreated] = await HabitGoal.findOrCreate({
                where: {
                    userId: userId,
                    name: habitGoal.name
                },
                defaults: {
                    description: habitGoal.description
                }
            });
            if (!hg) {
                return printDataError(res, "habit goal");
            }
            console.log('\n DV--', hg, '--DV\n');

            const name = baseHabit?.name;
            const icon = baseHabit?.icon ?? 'face-smile-beam';
            const reminders = req.body?.reminders;
            const difficulty = advanced.difficulty;
            const goalPercentage = advanced.goalPercentage;
            
            const habitSave = await Habit.upsert({
                habitGoalId: hg.dataValues.id,
                name: name,
                icon: icon,
                reminders: reminders,
                difficulty: difficulty,
                goalPercentage: goalPercentage,
            });
            if (!habitSave || !habitSave[0]) {
                return printDataError(res, "habit");
            }
            console.log('\n DV--', habitSave[0], '--DV\n');
            
            const schedulesPre = schedules
                .filter(s => s.days.filter(d => d === true).length > 0)
                .map((s, i)=>{
                    return ({
                        habitId: habitSave[0].id,
                        startTime: s.start,
                        duration: s.duration,
                        days: s.days
                    });
                });
            console.log('\n', schedulesPre, '\n');
            const schedulesSave = await Schedule.bulkCreate(schedulesPre, { validate: true });
            if (!schedulesSave) {
                return printDataError(res, "schedules");
            }
            
            return res.status(201).json({
                habitGoal: hg.dataValues,
                habit: habitSave[0].dataValues,
                schedules: schedulesSave
            });
            
        } catch (error) {
            return printServerError(res, error);
        }
    });
    
    //GET ALL HABITS
    app.get(name, async (req, res) => {
        try {
            const userId = req?.query?.userId;
            const habits = await HabitGoal.findAll({
                include: [
                    {
                        model: Habit,
                        as: "habits",
                        attributes: [],
                    }
                ],
                attributes: [
                    "userId",
                    ["id", "goalId"],
                    ["name", "goalName"],
                    ["description", "goalDescription"],
                    ["progress", "goalProgress"],
                    [Sequelize.col('habits.id'), "id"],
                    [Sequelize.col('habits.name'), "name"],
                    [Sequelize.col('habits.icon'), "icon"],
                    [Sequelize.col('habits.difficulty'), "difficulty"],
                    [Sequelize.col('habits.goalPercentage'), "goalPerc"],
                    [Sequelize.col('habits.reminders'), "reminders"],
                ],
                where: { userId: userId },
            });
            return res.json({ habits });
        } catch (error) {
            return printServerError(res, error);
        }
    });

    //GET TODAY HABITS
    app.get(nameCheck, async (req, res) => {
        try {
            const userId = req?.query?.userId;
            const todayDay = req?.query?.todayDay; // 1(lun) - 7(dom)
            const todayDate = req?.query?.today; // aaaa-mm-dd

            if (!userId || !todayDay || !todayDate) {
                return printDataError(res, 'user id, week day, and/or today');
            }

            const today = {
                start: new Date(todayDate).setHours(0,0,0,0),
                end: new Date(todayDate).setHours(23, 59, 59, 999),
            }
            let searchDay = Array(7).fill(null);
            searchDay[todayDay-1] = true;
            console.log(todayDay, searchDay);

            const habitsCheck = await HabitGoal.findAll({
                include: [
                    {
                        model: Habit,
                        as: "habits",
                        attributes: [], //"id", "name", "icon", "difficulty", "goalPercentage"
                        include: [{
                            model: Schedule,
                            as: "schedules",
                            attributes: [], //"startTime", "duration", "days"
                            where: Sequelize.literal(`days[${todayDay}] = true`),
                            include: [{
                                model: ScheduleDone,
                                as: "schedulesDone",
                                attributes: [],
                                where: {
                                    createdAt: {
                                        [Op.gt]: today.start,
                                        [Op.lt]: today.end,
                                    }
                                },
                                required: false,
                            }],
                        }],
                        required: true,
                    },
                ],
                attributes: [
                    "userId",
                    ["id", "goalId"],
                    ["name", "goalName"],
                    ["description", "goalDescription"],
                    ["progress", "goalProgress"],
                    [Sequelize.col('habits.id'), "habitId"],
                    [Sequelize.col('habits.name'), "habitName"],
                    [Sequelize.col('habits.icon'), "habitIcon"],
                    [Sequelize.col('habits.difficulty'), "difficulty"],
                    [Sequelize.col('habits.goalPercentage'), "habitGoalPerc"],
                    [Sequelize.col('habits.schedules.id'), "scheduleId"],
                    [Sequelize.col('habits.schedules.startTime'), "time"],
                    [Sequelize.col('habits.schedules.duration'), "duration"],
                    [Sequelize.col('habits.schedules.schedulesDone.scheduleId'), "doneId"],
                    [Sequelize.col('habits.schedules.schedulesDone.day'), "doneDay"],
                    // [Sequelize.col("habits.schedules.days"), "days"],
                ],
                where: { userId: userId },
                raw: true,
                // nest: true,
            });
            return res.json({ habitsCheck });
        } catch (error) {
            return printServerError(res, error);
        }
    });
    
    //CHECK HABIT
    app.post(nameCheck, async (req, res) => {
        try {
            
        } catch (error) {
            return printServerError(res, error);
        }
    });
};


module.exports = {
    HabitEndpoint
};
