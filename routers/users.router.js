const express = require(`express`)
const { getAllUsers, getUserByUsername } = require(`../controllers/users.controllers`)

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:username', getUserByUsername);

module.exports = usersRouter;