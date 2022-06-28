"use strict"

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require('../src/routes/admin.routes');

const app = express();

//CONFIGURACIONES INTERNAS DEL SERVIDOR
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//RUTAS DEL SERVIDOR
app.use('/admin', adminRoutes);

module.exports = app;