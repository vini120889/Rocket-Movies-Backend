const { Router } = require("express");
const tagsRouter = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const TagsController = require("../Controllers/TagsController")
const tagsController = new TagsController();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;