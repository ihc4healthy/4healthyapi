const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');
const {User} = require('./UserModel');

const Lesson = sequelize.define('Lesson', {

   title: {
      type: DataTypes.STRING,
      allowNull: false
   },
   tag: {
      type: DataTypes.STRING,
      allowNull : false
   },
   username:{
      type: DataTypes.STRING,
      allowNull: false,
      references:{
         model: User,
         key: 'username',
      },
   },
}, {tableName: 'lessons'});

User.hasMany(Lesson, { foreignKey: 'username' });
Lesson.belongsTo(User, { foreignKey: 'username' });

module.exports = {
    Lesson
};