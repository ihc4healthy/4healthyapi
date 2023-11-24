const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const {User} = require('./UserModel');

const Lesson = sequelize.define('Lesson', {
   userId:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false
   },
   description:{
      type: DataTypes.TEXT,
      allowNull: true
   },
   tag: {
      type: DataTypes.STRING,
      allowNull : false
   },
}, {tableName: 'lessons'});

User.hasMany(Lesson, {as: "lessons", foreignKey:"userId"});
Lesson.belongsTo(User, {foreignKey: "userId"});

const Question = sequelize.define( 'Question', {
   lessonId:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   text : {
      type: DataTypes.STRING,
      allowNull : false
   },
   check : {
      type: DataTypes.BOOLEAN,
      allowNull : false
   },
}, { tableName: 'questions' });

Lesson.hasMany(Question, {as: "questions", foreignKey: "lessonId"});
Question.belongsTo(Lesson, {foreignKey:"lessonId"})

module.exports = {
   Lesson,
   Question
};
