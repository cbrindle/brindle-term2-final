const mongoose = require('mongoose');
const moment = require('moment');

let ForumSchema = new mongoose.Schema({
    category: { 
        name: { type: String, default: "", unique: true },
        description: { type: String, default: "" },
        topics: [{
            subject: { type: String, default: "" },
            posts: [{
                text: { type: String, default: "" },
                author: { type: String, default: "" },
                timeStamp: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') }
                }]
            }]
        }
    },
)
module.exports = mongoose.model('forum', ForumSchema)