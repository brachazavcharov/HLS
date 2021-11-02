const express = require("express");
const route = express.Router();
const personalChatController = require("../controllers/personalChat");

route.get("/", personalChatController.getAll)
// route.get("/:id", personalChatController.getById)
route.post("/", personalChatController.postChat)
// route.put("/:id", personalChatController.updateChat)
route.delete("/:id", personalChatController.deleteChat)
module.exports = route;