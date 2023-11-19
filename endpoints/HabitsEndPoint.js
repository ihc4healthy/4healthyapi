const { CatHabits, Habits } = require('../models');
const name = "/habits";

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

HabitsEndPoint = (app) => {
   // CREAR categoria de hábitos
   app.post(name+'Cat', async (req, res) => {
      try{
         const title = req.body?.title;
         if(!title){
            return printDataError(res, "Titulo ");
         }
         
         const save = await CatHabits.create({
            title: title,
         });

         return res.status(201).json({ CatHabits: save });
      } catch (error) {
         return printServerError(res, error);
      }
   });
   // CREAR habito
   app.post(name, async(req,res) => {
      try{
         const idCategoria = req.body?.idCategoria;
         const title = req.body?.titulo;
         const titleShort = req.body?.tituloCorto;
         
         if(!idCategoria || !title || !titleShort){
            return printDataError(res, "Categoria and/or titulo and/or tituloCorto ");
         }

         // Verificar si la categoria existe antes de crear el hábito
         const existCat = await CatHabits.findOne({
            where: { id: idCategoria }
         });

         // Verificar si el hábito existe antes de crear
         const existHab = await Habits.findOne({ where:{ categoriaId:idCategoria , title:title}});
         
         if(!existCat) { return printDataError(res, "Id Categoria no existe!!"); }
         if(existHab) { return printDataError(res, "El hábito ya existe!!"); }

         const save = await Habits.create({
            categoriaId: idCategoria,
            title: title,
            titleShort: titleShort
         });
         return res.status(201).json({ habits:save });
      } catch(error) {
         return printServerError(res,error);
      }
   });
};

module.exports = {
   HabitsEndPoint
};