const PublicChat = require("../models/publicChat");
const getAll = async (req, res) => {
    let chats = await PublicChat.find();
    return res.send(chats);
}
// const getById = async (req, res) => {
//     let { id } = req.params;
//     let chat = await PublicChat.findById(id);
//     if (!chat)
//         return res.status(404).send("There is no such chat");
//     return res.send(chat);
// }
const postChat = async (req, res) => {
    let chat = req.body;
    let newChat = new PublicChat(chat);
    try {
        await newChat.save();
        return res.send(newChat);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
// const updateChat = async (req, res) => {
//     let chatBody = req.body;
//     let { id } = req.params;
//     let chat = await PublicChat.findById(id);
//     if (!chat)
//         return res.status(404).send("There is no such chat");
//     recipe.orderDate = recipeBody.orderDate || recipe.orderDate;
//     recipe.competitionId = recipeBody.competitionId || recipe.competitionId;
//     recipe.customerId = recipeBody.customerId || recipe.customerId;
//     recipe.recipeFile = recipeBody.recipeFile || recipe.recipeFile;
//     recipe.uploadDate = recipeBody.uploadDate || recipe.uploadDate;
//     recipe.likes = recipeBody.likes || recipe.likes;
//     try {
//         await recipe.save();
//         return res.send(recipe);
//     }
//     catch (err) {
//         return res.status(400).send(err.message);
//     }
// }
const deleteChat = async (req, res) => {
    let { id } = req.params;
    let deleted = await PublicChat.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such chat");
    return res.send(deleted);
}
module.exports = {
    getAll, postChat, deleteChat
}