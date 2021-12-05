const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    competitionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CompetitionFiles",
        required: true
    },
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer",
        required: true
    },
    recipeFile: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
    likes: {
        type: Number
    }
})
const Recipe = mongoose.model("Recipe", recipeSchema,"recipe");
module.exports = Recipe;