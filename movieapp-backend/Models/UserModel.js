const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    watchList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieModel'
    }]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;