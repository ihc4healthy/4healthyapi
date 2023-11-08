const express = require('express');
const app = express();

const { User } = require('../models');

const user = {
    post: ()=>{
        app.post("/user", async (req, res) => {
            try {
                const name = req.body.name;
                const password = req.body.name;
        
                if (!name || !password) {
                    return res
                        .status(400)
                        .json({ message: "el usuario y/o contraseña son incorrectos" });
                }
        
                const saveUser = await User.create((name, age));
                return res
                    .status(201)
                    .json({ user: saveUser });
            } catch (error) {
                return res.status(500).json("error interno de servidor");
            }
        })
    },
}

module.exports = {
    user
};
