'use strict'

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: String,
    usernameAdmin: String,
    passwordAdmin: String,
    role: String
});

module.exports = mongoose.model('Admin', adminSchema);