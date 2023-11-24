const { json } = require('express');
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


 //cambiar contraseña
    app.put('/updatepassword', async (req, res) => {
        try{
        const body=req.body; 
        await User.update({
            password: body.password,
         }, { where: { id: body.id }, });
        return res.status(200).json({ message: "Password updated successfully", user: body.User });
    }
    catch(error){
        console.error("Error", error);
          return res.status(500).json({ message: "Internal server error" });
    }
    
    });

    app.put('/updateuser', async (req, res) => {
        try{
        const body=req.body; 
        await User.update({
            username: body.username,
         }, { where: { id: body.id }, });
        return res.status(200).json({ message: "username updated successfully", user: body.User });
    }
    catch(error){
        console.error("Error", error);
          return res.status(500).json({ message: "Internal server error" });
    }
    
    });

    app.put('/updateemail', async (req, res) => {
        try{
        const body=req.body; 
        await User.update({
            email: body.email,
         }, { where: { id: body.id }, });
        return res.status(200).json({ message: "email updated successfully", user: body.User });
    }
    catch(error){
        console.error("Error", error);
          return res.status(500).json({ message: "Internal server error" });
    }
    
    });


    
};


module.exports = {
    UserEndpoint
};
