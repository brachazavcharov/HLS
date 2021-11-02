const express = require("express");
const route = express.Router();
const publicChatController = require("../controllers/publicChat");

route.get("/", publicChatController.getAll)
// route.get("/:id", publicChatController.getById)
route.post("/", publicChatController.postChat)
// route.put("/:id", publicChatController.updateChat)
route.delete("/:id", publicChatController.deleteChat)
module.exports = route;