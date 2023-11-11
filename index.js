const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const { sequelize } = require('./connection');
const { UserEndpoint } = require('./endpoints/UserEndpoint');
const { Solicitud } = require("./models");

app.use(express.json());
app.use(cors());

// Endpoints
UserEndpoint(app);
app.post("/solicitudes", async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Bad request, name or age not found" });
    }
    const save = await Solicitud.create({
      email,
      password,
    });
    return res.status(201).json({ solicitud: save });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


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

