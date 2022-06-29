'use strict'

const express = require('express');
const api = express.Router();
const teacherController = require('../controllers/teacher.controller');
const middleware = require('../services/middleware');

api.get('/testTeacherController', teacherController.testTeacherController);
api.get('/getGroups/:idTeacher', [middleware.isLoged, middleware.isTeacher], teacherController.getGroups);
api.get('/getGroup/:idGroup', [middleware.isLoged, middleware.isTeacher], teacherController.getGroup);
api.get('/getAlumns/:idGroup', [middleware.isLoged, middleware.isTeacher], teacherController.getAlumns);
api.get('/getAlumn/:idAlumn', [middleware.isLoged, middleware.isTeacher], teacherController.getAlumn);
api.get('/getReportsAlumn/:idAlumn', [middleware.isLoged, middleware.isTeacher], teacherController.getReportsAlumn);
api.get('/getReportAlumn/:idReport', [middleware.isLoged, middleware.isTeacher], teacherController.getReportAlumn);
api.get('/getQualificationAlumn/:idAlumn', [middleware.isLoged, middleware.isTeacher], teacherController.getQualificationAlumn);
api.get('/getProfileAlumn/:idAlumn', [middleware.isLoged, middleware.isTeacher], teacherController.getProfileAlumn);
api.get('/getProfile/:idTeacher', [middleware.isLoged, middleware.isTeacher], teacherController.getProfile);
api.put('/updateProfile/:idTeacher', [middleware.isLoged, middleware.isTeacher], teacherController.updateProfile);
api.post('/createAlumn/:idGroup/:idSupervisor', [middleware.isLoged, middleware.isTeacher], teacherController.createAlumn);
api.get('/getSupervisors', [middleware.isLoged, middleware.isTeacher], teacherController.getSupervisors);

module.exports = api;