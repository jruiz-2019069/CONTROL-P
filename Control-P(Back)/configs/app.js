"use strict"

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require('../src/routes/admin.routes');
const alumnRoutes = require('../src/routes/alumn.routes');
const supervisorRoutes = require('../src/routes/supervisor.routes');
const teacherRoutes = require('../src/routes/teacher.routes');

const app = express();

//CONFIGURACIONES INTERNAS DEL SERVIDOR
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//RUTAS DEL SERVIDOR
app.use('/admin', adminRoutes);
app.use('/alumn', alumnRoutes);
app.use('/supervisor', supervisorRoutes);
app.use('/teacher', teacherRoutes);

module.exports = app;