'use strict'

const Report = require('../models/report.model');
const Qualification = require('../models/qualification.model');
const Alumn = require('../models/alumn.model');
const Supervisor = require('../models/supervisor.model');
const { dataObligatory } = require('../utils/validate');

exports.testSupervisorController = (req, res)=>{
    return res.send({message: 'The function test supervisor controller is running'});
}

//Función para ver los practicantes de un supervisor
exports.getAlumns = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const alumnsFound = await Alumn.find({idSupervisor: idSupervisor}).populate('idGroup');
        if(alumnsFound.length != 0){
            return res.status(200).send({alumnsFound});
        }else{
            return res.status(404).send({message: 'There are no alumns'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un practicante de un supervisor
exports.getAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const alumnFound = await Alumn.findOne({_id: idAlumn});
        if(alumnFound.length != 0){
            return res.status(200).send({alumnFound});
        }else{
            return res.status(404).send({message: 'There are no alumns'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ponerle una calificación a un alumno
exports.createQualification = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const idAlumn = req.params.idAlumn;
        const params = req.body;
        const data = {
            creativity: params.creativity,
            leadership: params.leadership,
            autodidact: params.autodidact,
            communication: params.communication,
            initiative: params.initiative,
            teamwork: params.teamwork,
            idAlumn: idAlumn,
            idSupervisor: idSupervisor
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const qualificationFound = await Qualification.findOne({idAlumn: idAlumn});
            if(qualificationFound){
                return res.status(400).send({message: 'This student already has a qualification'});
            }else{
                let qualification = new Qualification(data);
                await qualification.save();
                return res.status(200).send({message: 'Qualification created successfully'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver los reportes de un alumno
exports.getReportsAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const reportsFound = await Report.find({idAlumn: idAlumn}).populate('idAlumn');
        if(reportsFound.length != 0){
            return res.status(200).send({reportsFound});
        }else{
            return res.status(404).send({message: 'There are no reports'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver el reporte de un alumno
exports.getReportAlumn = async(req, res)=>{
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

//Función para ver el perfil de un supervisor
exports.getProfile = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const supervisorFound = await Supervisor.findOne({_id: idSupervisor});
        if(supervisorFound){
            return res.status(200).send({supervisorFound});
        }else{
            return res.status(404).send({message: 'Your profile no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para editar un supervisor
exports.updateProfileSupervisor = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const params = req.body;
        const data = {
            name: params.name,
            nameCompany: params.nameCompany,
            email: params.email,
            usernameSupervisor: params.usernameSupervisor,
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const supervisor = await Supervisor.findOne({_id: idSupervisor});
            if(supervisor){
                if(supervisor.usernameSupervisor != params.usernameSupervisor){
                    const supervisorFound = await Supervisor.findOne({usernameSupervisor: params.usernameSupervisor});
                    if(supervisorFound){
                        return res.status(400).send({message: 'This supervisor username already exist'});
                    }else{
                        const supervisorUpdated = await Supervisor.findOneAndUpdate({_id: idSupervisor}, data, {new:true});
                        return res.status(200).send({message: 'Profile updated successfully'});
                    }
                }else{
                    const supervisorUpdated = await Supervisor.findOneAndUpdate({_id: idSupervisor}, data, {new:true});
                    return res.status(200).send({message: 'Profile updated successfully'});
                }
            }else{
                return res.status(404).send({message: 'This supervisor no longer exists'}); 
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}