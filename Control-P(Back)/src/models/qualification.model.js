'use strict'

const mongoose = require('mongoose');

const qualificationSchema = mongoose.Schema({
    creativity: String,
    leadership: String,
    autodidact: String,
    communication: String,
    initiative: String,
    teamwork: String,
    idAlumn: {type: mongoose.Schema.ObjectId, ref: 'Alumn'},
    idSupervisor: {type: mongoose.Schema.ObjectId, ref: 'Supervisor'}
});

module.exports = mongoose.model('Qualification', qualificationSchema)

