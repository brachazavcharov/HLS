const mongoose = require("mongoose");
const publicChatSchema = mongoose.Schema({
    participants: {
        //איך מוסיפים את המדריכה למשתתפים
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Customer",
        required: true
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
const PublicChat = mongoose.model("PublicChat", publicChatSchema,"publicChat");
module.exports = PublicChat;