const { User } = require('../models');
const { printDataError, printServerError } = require('../utils/printErrors');
const name = "/user";

UserEndpoint = (app) => {
    // CREATE
    app.post(name, async (req, res) => {
        try {
            const name = req.body?.name;
            const password = req.body?.password;

            if (!name || !password) {
                return printDataError(res, "user and/or password")
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
            return res.status(201).json({ user: save });

        } catch (error) {
            return printServerError(res, error);
        }
    });

    // UPDATE : ADDING MORE INFO
    app.patch(name+'/', async (req, res) => {
        try {
            const id = req.body?.id;
            const userType = req.body?.userType;
            const profilePic = req.body?.profilePic;
            
            // 'WORK', 'STUDIES', 'ANY'
            if (!id) {
                return printDataError(res, "user")
            }
            if (!userType || !profilePic) {
                return printDataError(res, "user type and/or profile pic")
            }
            
            const save = await User.update({
                type: userType,
                profilePic: profilePic,
            }, { where: { id: id }, });
            return res.status(201).json({ user: save });

        } catch (error) {
            return printServerError(res, error);
        }
    });

    // LOGIN: REVISANDO SI EXISTE EL USUARIO
    app.post(name + '/login', async (req, res) => {
        try {
            const name = req.body?.name;
            const password = req.body?.password;
    
            if (!name || !password) {
                return printDataError(res, "user and/or password")
            }

            const field = name.indexOf('@') >= 0 ? 'email' : 'username';
    
            const user = await User.findOne({
                where:{
                    [field]:name,
                    password: password
                }
            });
    
            if (!user) {
                return res.status(401).json({ message: "Usuario o contraseña Invalido" });
            }
    
            return res.status(200).json({ user: user });
    
        } catch (error) {
            return printServerError(res, error);
        }
    });
    
};


module.exports = {
    UserEndpoint
};
