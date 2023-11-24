const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const { sequelize } = require('./connection');
const { UserEndpoint } = require('./endpoints/UserEndpoint');
const { GoalEndpoint } = require('./endpoints/GoalEndpoint');
const { SolicitudEndpoint } = require('./endpoints/SolicitudEndpoint');
const { LessonEndpoint } = require('./endpoints/LessonEndPoint');
const { HabitEndpoint } = require('./endpoints/HabitEndpoint');
const { HabitsEndPoint } = require('./endpoints/HabitsEndPoint');
const { CommentEndpoint } = require('./endpoints/CommentEndpoint');

app.use(express.json());
app.use(cors());

// Endpoints
UserEndpoint(app);
GoalEndpoint(app);
SolicitudEndpoint(app);
LessonEndpoint(app);
HabitEndpoint(app);
HabitsEndPoint(app);
CommentEndpoint(app);

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

