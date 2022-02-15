const mongoose = require("mongoose");
const competitionFilesSchema = mongoose.Schema({
    name: {
        type: String,
        // minLength: 2,
        // maxLength: 15,
        lowercase: true,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    prize: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    winningRecipeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Recipe",
        // required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isEnded:{
        type:Boolean,
        default: false,
        required: true
    }
})
const CompetitionFiles = mongoose.model("CompetitionFiles", competitionFilesSchema, "competitionFiles");
module.exports = CompetitionFiles;