const { User,Goal } = require('../models');
const name = "/user";
const namegoal="/goal";

const printDataError = (res, data) => {
    return res
        .status(400)
        .json({ message: data + " incorrect" });
};

const printServerError = (res, error) => {
    console.log("Error", error);
    return res
        .status(500)
        .json({ message: "Internal server error", error: error });
};

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
    //GET
    app.get(namegoal, async (req, res) => {
        try {
          const goals = await Goal.findAll();
          return res.json({ goals });
        } catch (error) {
          console.log("Error", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      });
};


module.exports = {
    UserEndpoint
};
