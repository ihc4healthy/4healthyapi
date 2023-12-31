const {Sequelize} = require('sequelize');

const database = "dt_4healthy";
const username = "postgres";
const password = "admin";
const host = "localhost";
const port = "5432";

const sequelize = new Sequelize(
    database, username, password, host, port,
    {
        host: host,
        port: port,
        dialect: 'postgres'
    }
);

module.exports = {
    sequelize
};