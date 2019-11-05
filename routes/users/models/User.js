const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    profile: {
        name: { type: String, default: "" },
        picture: { type: String, default: "" }
    },
    admin: { type: Boolean, default: false },
    passchange: { type: Boolean, default: false }
})

module.exports = mongoose.model('user', UserSchema)