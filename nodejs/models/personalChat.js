const mongoose = require("mongoose");
const personalChatSchema = mongoose.Schema({
    participants: {
        //איך מוסיפים את המדריכה למשתתפים
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Customer",
        required: true,
        length: 2
    },
    messages: {
        type: [{
            writer: {
                type: [mongoose.SchemaTypes.ObjectId],
                ref: "Customer",
                required: true
                //צריך להוסיף refלמדריכה
            },
            date: {
                type: Date,
                value: new Date()
            },
            content: {
                type: String
            }
        }]
    }
})
const PersonalChat = mongoose.model("PersonalChat", personalChatSchema,"personalChat");
module.exports = PersonalChat;