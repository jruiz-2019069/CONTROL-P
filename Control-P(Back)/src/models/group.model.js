'use strict'

const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    code: String,
    career: String,
    time: String,
    section: String,
    idTeacher: {type: mongoose.Schema.ObjectId, ref: 'Teacher'}
});

module.exports = mongoose.model('Group', groupSchema);