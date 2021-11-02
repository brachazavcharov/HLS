const express = require("express");
const route = express.Router();
const competitionFileController = require("../controllers/competitionFiles");

route.get("/", competitionFileController.getAll)
route.get("/:id", competitionFileController.getById)
route.post("/", competitionFileController.postCompetitionFile)
route.put("/:id", competitionFileController.updateCompetitionFile)
route.delete("/:id", competitionFileController.deleteCompetitionFile)
module.exports = route;