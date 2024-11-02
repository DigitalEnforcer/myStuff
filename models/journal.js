const mongoose = require("mongoose")
const Schema = mongoose.Schema

const journalSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model("Journal", journalSchema)