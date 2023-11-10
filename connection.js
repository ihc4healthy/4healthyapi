const {Sequelize} = require('sequelize');

const database = "dt_4healthy";
const username = "postgres";
const password = "admin123Admin";
const host = "localhost";
const port = "5432";

const sequelize = new Sequelize(
    database, username, password,
    {
        host: host,
        port: port,
        dialect: 'postgres',
    }
);

module.exports = {
    sequelize,
};