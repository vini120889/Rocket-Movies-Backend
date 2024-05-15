const { Router } = require("express");
const notesRouter = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const NotesController = require("../Controllers/NotesController")
const notesController = new NotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.get("/", notesController.index);
notesRouter.post("/", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);



module.exports = notesRouter;