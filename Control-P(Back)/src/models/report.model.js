'use strict'

const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    dateCreation: Date,
    activities: String,
    learned: String,
    difficulties: String,
    idAlumn: {type: mongoose.Schema.ObjectId, ref: 'Alumn'}
});

module.exports = mongoose.model('Report', reportSchema);