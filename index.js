const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const { sequelize } = require('./connection');
const { UserEndpoint } = require('./endpoints/UserEndpoint');


app.use(express.json());
app.use(cors());

UserEndpoint(app);


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

