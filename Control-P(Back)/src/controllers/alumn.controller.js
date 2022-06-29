'use strict'

const Report = require('../models/report.model');
const Alumn = require('../models/alumn.model');
const Qualification = require('../models/qualification.model');
const moment = require('moment');
const date = moment();
const { dataObligatory } = require('../utils/validate');

exports.testAlumnController = (req, res)=>{
    return res.send({message: 'The function test alumn controller is running'});
}

//Función para ver todos los reportes de un alumno
exports.getReports = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const alumnReports = await Report.find({idAlumn: idAlumn});
        if(alumnReports.length != 0){
            return res.status(200).send({alumnReports});
        }else{
            return res.status(404).send({message: 'There are no reports'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un reporte
exports.getReport = async(req, res)=>{
    try{
        const idReport = req.params.idReport;
        const reportFound = await Report.findOne({_id: idReport});
        if(reportFound){
            return res.status(200).send({reportFound});
        }else{
            return res.status(404).send({message: 'This report no longer exists'}); 
            
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para crear un reporte
exports.createReport = async(req, res)=>{
    try{
        
        const idAlumn = req.params.idAlumn;
        const params = req.body;
        const data = {
            dateCreation: date.format('YYYY-MM-D'),
            activities: params.activities,
            learned: params.learned,
            difficulties: params.difficulties,
            idAlumn: idAlumn    
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let report = new Report(data);
            await report.save();
            return res.status(200).send({message: 'Report created successfully'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver la calificación de un alumno
exports.getQualification = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const qualificationFound = await Qualification.findOne({idAlumn: idAlumn});
        if(qualificationFound){
            return res.status(200).send({qualificationFound});
        }else{
            return res.status(404).send({message: 'You dont have a qualification yet'});
        }
    }catch(err){

    }console.log(err);
}

//Función para ver el perfil de un alumno
exports.getProfile = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const alumnFound = await Alumn.findOne({_id: idAlumn});
        if(alumnFound){
            return res.status(200).send({alumnFound});
        }else{
            return res.status(404).send({message: 'This alumn no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver el grupo al que pertenece un alumno
exports.getGroup = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const groupFound = await Alumn.findOne({_id: idAlumn}).populate('idGroup');
        return res.status(200).send({groupFound});
    }catch(err){
        console.log(err);
        return err;
    }
}


