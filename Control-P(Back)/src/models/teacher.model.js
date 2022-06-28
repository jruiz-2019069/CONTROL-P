'use strict'

const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: String,
    email: String,
    usernameTeacher: String,
    passwordTeacher: String,
    role: String
});

module.exports = mongoose.model('Teacher', teacherSchema);