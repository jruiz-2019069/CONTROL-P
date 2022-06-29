'use strict'

const express = require('express');
const api = express.Router();
const alumnController = require('../controllers/alumn.controller');
const middleware = require('../services/middleware');

api.get('/testAlumnController', alumnController.testAlumnController);
api.get('/getReports/:idAlumn', [middleware.isLoged, middleware.isAlumn], alumnController.getReports);
api.get('/getReport/:idReport', [middleware.isLoged, middleware.isAlumn], alumnController.getReport);
api.post('/createReport/:idAlumn', [middleware.isLoged, middleware.isAlumn], alumnController.createReport);
api.get('/getQualification/:idAlumn', [middleware.isLoged, middleware.isAlumn], alumnController.getQualification);
api.get('/getProfile/:idAlumn', [middleware.isLoged, middleware.isAlumn], alumnController.getProfile);
api.get('/getGroup/:idAlumn', [middleware.isLoged, middleware.isAlumn], alumnController.getGroup);

module.exports = api;