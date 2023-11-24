const { Comment } = require('../models');
const commi = "/comments";

CommentEndpoint = (app) => {
    app.post(commi, async (req, res) => {
        try{
            const category = req.body.category;
            const title = req.body.title;
            const content = req.body.content;
            const image = req.body.image;

            if (!category || !title || !content) {
                return res.status(400).json({ message: "La categoría, el título o el contenido no son correctos" });
            }

            const saveComment = await Comment.create({
                category: category,
                title: title, 
                content: content,
                image: image
            });
            return res
                .status(201)
                .json({comment: saveComment});
        }catch(error){
            return res.status(500).json({message:"error interno de servidor"})
        }
    })

    app.get(commi, async (req, res) => {
        try {
            // Obtener todos los comentarios desde la base de datos
            const comments = await Comment.findAll();

            return res.json({ comments });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error interno de servidor" });
        }
    });
};

module.exports = {
    CommentEndpoint
};