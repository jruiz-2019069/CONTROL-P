'use strict'

const mongoose = require('mongoose');

const qualificationSchema = mongoose.Schema({
    creativity: Number,
    leadership: Number,
    autodidact: Number,
    communication: Number,
    initiative: Number,
    teamwork: Number,
    idAlumn: {type: mongoose.Schema.ObjectId, ref: 'Alumn'},
    idSupervisor: {type: mongoose.Schema.ObjectId, ref: 'Supervisor'}
});

module.exports = mongoose.model('Qualification', qualificationSchema)

