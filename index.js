const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const { sequelize } = require('./connection');
const { user } = require('./endpoints/User');

app.use(express.json());
app.use(cors());

user.post();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection success");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Sync models");
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection fail", error);
  });

