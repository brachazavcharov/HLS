const express = require("express");
const route = express.Router();
const recipeController = require("../controllers/recipe");

route.get("/", recipeController.getAll)
route.get("/:id", recipeController.getById)
route.post("/", recipeController.postRecipe)
route.put("/:id", recipeController.updateRecipe)
route.delete("/:id", recipeController.deleteRecipe)
module.exports = route;