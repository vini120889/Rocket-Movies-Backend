const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");


const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UserController = require("../Controllers/UserController");
const UserAvatarController = require("../Controllers/UserAvatarController");

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = usersRouter;