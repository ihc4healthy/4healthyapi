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
   tag: {
      type: DataTypes.STRING,
      allowNull : false
   },
}, {tableName: 'lessons'});

User.hasMany(Lesson, {as: "lessons", foreignKey:"userId"});
Lesson.belongsTo(User, {foreignKey: "userId"});


module.exports = {
   Lesson
};
