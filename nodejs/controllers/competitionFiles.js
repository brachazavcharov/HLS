const CompetitionFiles = require("../models/competitionFiles");
const getAll = async (req, res) => {
    let competitionFiles = await CompetitionFiles.find();
    return res.send(competitionFiles);
}
const getById = async (req, res) => {
    let { id } = req.params;
    let competitionFiles = await CompetitionFiles.findById(id);
    if (!competitionFiles)
        return res.status(404).send("There is no such competition");
    return res.send(competitionFiles);
}
const postCompetitionFile = async (req, res) => {
    let competitionFiles = req.body;
    let newCompetitionFile = new CompetitionFiles(competitionFiles);
    try {
        await newCompetitionFile.save();
        return res.send(newCompetitionFile);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const updateCompetitionFile = async (req, res) => {
    let competitionFileBody = req.body;
    let { id } = req.params;
    let competitionFile = await CompetitionFiles.findById(id);
    if (!competitionFile)
        return res.status(404).send("There is no such competition");
    competitionFile.name = competitionFileBody.name || competitionFile.name;
    competitionFile.date = competitionFileBody.date || competitionFile.date;
    competitionFile.details = competitionFileBody.details || competitionFile.details;
    competitionFile.prize = competitionFileBody.prize || competitionFile.prize;
    competitionFile.winningRecipeId = competitionFileBody.winningRecipeId || competitionFile.winningRecipeId;
    competitionFile.endDate = competitionFileBody.endDate || competitionFile.endDate;
    try {
        await competitionFile.save();
        return res.send(competitionFile);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const deleteCompetitionFile = async (req, res) => {
    let { id } = req.params;
    let deleted = await CompetitionFiles.findByIdAndRemove(id);
    if (!deleted)
        return res.status(404).send("There is no such competition");
    return res.send(deleted);
}
module.exports = {
    getAll, getById, postCompetitionFile, updateCompetitionFile, deleteCompetitionFile
}
