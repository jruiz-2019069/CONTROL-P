'use strict'

const mongoose = require('mongoose');

const supervisorSchema = mongoose.Schema({
    name: String,
    nameCompany: String,
    email: String,
    usernameSupervisor: String,
    passwordSupervisor: String,
    role: String
});

module.exports = mongoose.model('Supervisor', supervisorSchema);