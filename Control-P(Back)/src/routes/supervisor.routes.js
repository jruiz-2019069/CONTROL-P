'use strict'

const express = require('express');
const api = express.Router();
const supervisorController = require('../controllers/supervisor.controller');
const middleware = require('../services/middleware');

api.get('/testSupervisorController', supervisorController.testSupervisorController);
api.get('/getAlumns/:idSupervisor', [middleware.isLoged, middleware.isSupervisor], supervisorController.getAlumns);
api.get('/getAlumn/:idAlumn', middleware.isLoged, supervisorController.getAlumn);
api.post('/createQualification/:idSupervisor/:idAlumn', [middleware.isLoged, middleware.isSupervisor], supervisorController.createQualification);
api.get('/getReportsAlumn/:idAlumn', middleware.isLoged, supervisorController.getReportsAlumn);
api.get('/getReportAlumn/:idReport', [middleware.isLoged, middleware.isSupervisor], supervisorController.getReportAlumn);
api.get('/getProfile/:idSupervisor', [middleware.isLoged, middleware.isSupervisor], supervisorController.getProfile);
api.put('/updateProfileSupervisor/:idSupervisor', [middleware.isLoged, middleware.isSupervisor], supervisorController.updateProfileSupervisor);

module.exports = api;