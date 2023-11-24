const { Lesson, User, Question} = require('../models');
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
         const description = req.body?.description;
         const tag = req.body?.tag;
         const questions = req.body?.questions;

         if (!userId || !title || !tag || !description || !questions) {
            return printDataError(res, "userId and/or title and/or tag");
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

         // Crear la lección
         const saveLesson = await Lesson.create({
            userId: userId,
            title: title,
            description: description,
            tag: tag,
         });
         const idLesson = saveLesson.id;
         console.log("********* "+idLesson);
         // Crear preguntas asociadas a la lección
         const savedQuestions = await Promise.all(
            questions.map(async (question) => {
               console.log("*xxxxxxxxx* "+idLesson);
               return await Question.create({
                  lessonId: idLesson, // Usar saveLesson.id en lugar de rptLesson.id
                  text: question.text,
                  check: question.check,
               });
            })
         );

         // Retornar tanto la lección como las preguntas creadas
         const response = {
            lesson: saveLesson,
            questions: savedQuestions,
         };

         return res.status(201).json(response);

      } catch (error) {
         return printServerError(res, error);
      }
   });
};

module.exports = {
   LessonEndpoint
};
