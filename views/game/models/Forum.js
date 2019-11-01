const mongoose = require('mongoose')

let ForumSchema = new mongoose.Schema({
    category: { 
        name: { type: String, default: "", unique: true },
        topics: {
            topicName: {type: String, default: "" },
            posts: {
                subject: { type: String, default: "" },
                author: { type: String, default: "" },
                text: { type: String, default: "" }
            }
        }
    },

})

module.exports = mongoose.model('forum', ForumSchema)