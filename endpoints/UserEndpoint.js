const { User } = require('../models');
const name = "/user";

UserEndpoint = (app) => {

    // CREATE
    app.post(name, async (req, res) => {
        try {
            const name = req.body?.name;
            const password = req.body?.password;
    
            if (!name || !password) {
                return res
                    .status(400)
                    .json({ message: "el usuario y/o contraseña son incorrectos" });
            }
            
            const save = await User.create({
                username: name,
                email: name,
                password: password,
            }, {
                fields: [
                    (name.indexOf('@') >= 0 ? 'email':'username'),
                    'password'
                ]
            });

            return res
                .status(201)
                .json({ user: save });

        } catch (error) {
            console.log("Error", error);
            return res
                .status(500)
                .json({ message: "error interno de servidor "+error });
        }
    })

    
};


module.exports = {
    UserEndpoint
};
