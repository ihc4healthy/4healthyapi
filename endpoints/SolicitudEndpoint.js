const { Solicitud } = require('../models');

const soli="/solicitudes";

SolicitudEndpoint = (app) => {
    app.post(soli, async (req, res) => {
        try {
          const email = req.body?.email;
          const password = req.body?.password;
      
          if (!email || !password) {
            return res
              .status(400)
              .json({ message: "Bad request, name or age not found" });
          }
          const updatedUser = await Solicitud.update(
            { password: password },
            { where: { email: email } }
          );
          return res.status(200).json({ message: "Password updated successfully", user: updatedUser });
        } catch (error) {
          console.error("Error", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      });
}

module.exports = {
    SolicitudEndpoint
};