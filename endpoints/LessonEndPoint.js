const { Lesson, User} = require('../models');
const name = "/lesson";

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

LessonEndpoint = (app) => {
   // CREATE
   app.post(name, async (req, res) => {
      try {
         const userId = req.body?.userId;
         const title = req.body?.title;
         const tag = req.body?.tag;

         if (!userId || !title || !tag) {
            return printDataError(res, "userId and/or title and/or tag")
         }
         
         // Verificar si el usuario existe antes de crear la lección
         const existingUser = await User.findOne({
            where: {
               id: userId,
            },
         });

         if (!existingUser) {
            return printDataError(res, "usuario no existe");
         }
         const save = await Lesson.create({
            userId: userId,
            title: title,
            tag: tag,
         });
         return res.status(201).json({ lesson: save });

      } catch (error) {
         return printServerError(res, error);
      }
   });

   // UPDATE : TAG
   app.patch(name+'/', async (req, res) => {
      try {
         const id = req.body?.id;
         const newtag = req.body?.newtag;
         
         if (!id || !newtag) {
            return printDataError(res, "user and/or newtag")
         }
         
         const save = await Lesson.update({
            tag: newtag,
         }, { where: { id: id }, });
         return res.status(201).json({ lesson: save });

      } catch (error) {
         return printServerError(res, error);
      }
   });
};

module.exports = {
   LessonEndpoint
};
