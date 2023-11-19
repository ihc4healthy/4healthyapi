const {DataTypes} = require('sequelize');
const {sequelize} = require('../connection');

const CatHabits = sequelize.define('Cathabit', {
   title: {
      type: DataTypes.STRING,
      allowNull: false
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
},{ tableName: 'CatHabits'});

const Habits = sequelize.define('Habit', {
   categoriaId:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   title:{
      type: DataTypes.STRING,
      allowNull: false
   },
   titleShort: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
         len: [4,15],
         notEmpty: true
      }
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
   },
}, { tableName: 'habits' });

CatHabits.hasMany(Habits, { as:"habits", foreignKey:"categoriaId" });
Habits.belongsTo(CatHabits, {foreignKey:"categoriaId"});

module.exports = {
   CatHabits,
   Habits
};
