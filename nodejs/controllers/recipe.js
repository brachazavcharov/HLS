const Recipe = require("../models/recipe");
const getAll = async (req, res) => {
    let recipes = await Recipe.find();
    return res.send(recipes);
}
const getById = async (req, res) => {
    let { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe)
        return res.status(404).send("There is no such recipe");
    return res.send(recipe);
}
const postRecipe = async (req, res) => {
    let recipe = req.body;
    let newRecipe = new Recipe(recipe);
    try {
        await newRecipe.save();
        return res.send(newRecipe);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const updateRecipe = async (req, res) => {
    let recipeBody = req.body;
    let { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe)
        return res.status(404).send("There is no such recipe");
    recipe.orderDate = recipeBody.orderDate || recipe.orderDate;
    recipe.competitionId = recipeBody.competitionId || recipe.competitionId;
    recipe.customerId = recipeBody.customerId || recipe.customerId;
    recipe.recipeFile = recipeBody.recipeFile || recipe.recipeFile;
    recipe.uploadDate = recipeBody.uploadDate || recipe.uploadDate;
    recipe.likes = recipeBody.likes || recipe.likes;
    try {
        await recipe.save();
        return res.send(recipe);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
const deleteRecipe = async (req, res) => {
    let { id } = req.params;
    let deleted = await Recipe.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such recipe");
    return res.send(deleted);

}
module.exports = {
    getAll, getById, postRecipe, deleteRecipe, updateRecipe
}