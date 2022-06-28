'use strict'

const mongoose = require('mongoose');

const alumnSchema = mongoose.Schema({
    name: String,
    carnet: String,
    email: String,
    usernameAlumn: String,
    passwordAlumn: String,
    hoursDone: Number,
    idGroup: {type: mongoose.Schema.ObjectId, ref: 'Group'},
    idSupervisor: {type: mongoose.Schema.ObjectId, ref: 'Supervisor'},
    role: String
});

module.exports = mongoose.model('Alumn', alumnSchema);

