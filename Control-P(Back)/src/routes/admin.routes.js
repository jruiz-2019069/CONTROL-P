'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require('../services/middleware');

api.get('/testAdminController', adminController.testAdminController);
api.post('/createAdmin', adminController.createAdmin);
api.post('/login', adminController.login);
api.post('/createSupervisor', [middleware.isLoged, middleware.isAdmin], adminController.createSupervisor);
api.get('/getSupervisors', [middleware.isLoged, middleware.isAdmin], adminController.getSupervisors);
api.get('/getSupervisor/:idSupervisor', middleware.isLoged, adminController.getSupervisor);
api.put('/updateSupervisor/:idSupervisor', [middleware.isLoged, middleware.isAdmin], adminController.updateSupervisor);
api.delete('/deleteSupervisor/:idSupervisor', [middleware.isLoged, middleware.isAdmin], adminController.deleteSupervisor);
api.post('/createTeacher', [middleware.isLoged, middleware.isAdmin], adminController.createTeacher);
api.get('/getTeachers', [middleware.isLoged, middleware.isAdmin], adminController.getTeachers);
api.get('/getTeacher/:idTeacher', middleware.isLoged, adminController.getTeacher);
api.put('/updateTeacher/:idTeacher', [middleware.isLoged, middleware.isAdmin], adminController.updateTeacher);
api.delete('/deleteTeacher/:idTeacher', [middleware.isLoged, middleware.isAdmin], adminController.deleteTeacher);
api.post('/createGroup/:idTeacher', [middleware.isLoged, middleware.isAdmin], adminController.createGroup);
api.get('/getGroups', [middleware.isLoged, middleware.isAdmin], adminController.getGroups);
api.get('/getGroup/:idGroup', [middleware.isLoged, middleware.isAdmin], adminController.getGroup);
api.put('/updateGroup/:idGroup', [middleware.isLoged, middleware.isAdmin], adminController.updateGroup);
api.delete('/deleteGroup/:idGroup', [middleware.isLoged, middleware.isAdmin], adminController.deleteGroup);
api.post('/createAlumn/:idGroup/:idSupervisor', [middleware.isLoged, middleware.isAdmin], adminController.createAlumn);
api.get('/getAlumns', [middleware.isLoged, middleware.isAdmin], adminController.getAlumns);
api.get('/getAlumn/:idAlumn', middleware.isLoged, adminController.getAlumn);
api.put('/updateAlumn/:idAlumn', [middleware.isLoged, middleware.isAdmin], adminController.updateAlumn);
api.delete('/deleteAlumn/:idAlumn', [middleware.isLoged, middleware.isAdmin], adminController.deleteAlumn);

module.exports = api;