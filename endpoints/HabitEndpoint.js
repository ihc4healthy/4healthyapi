const { User, HabitGoal, Habit, Schedule } = require('../models');
const { printDataError, printServerError } = require('../utils/printErrors');
const name = "/habit";

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
    
};


module.exports = {
    HabitEndpoint
};
