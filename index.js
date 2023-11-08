const express = require('express');
const app = express();
const port = 3000;

const { sequelize } = require('./connection');
// const { NomTable } = require('./models');

app.get('/', (req, res)=>{
    res.send('Hola');
});

sequelize
    .authenticate()
    .then(()=>{
        console.log('conexion BD ok');
        return sequelize.sync();
    })
    .then(()=>{
        app.listen(port, ()=>{
            console.log('Servidor iniciado');
        });
    })
    .catch(err=>{
        console.log('error')
    });

