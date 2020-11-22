const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
    },
    lastName: {
        type: String,
        lowercase: true
    },
    mobileNumber: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    }
});

module.exports = User = mongoose.model('user', user);