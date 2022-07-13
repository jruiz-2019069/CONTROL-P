'use strict'

const Teacher = require('../models/teacher.model');
const Alumn = require('../models/alumn.model');
const Report = require('../models/report.model');
const Supervisor = require('../models/supervisor.model');
const Group = require('../models/group.model');
const Qualification = require('../models/qualification.model');
const {dataObligatory, encryptPassword} = require('../utils/validate');


exports.testTeacherController = (req, res)=>{
    return res.send({message: 'The function test teacher controller is running'});
}

//Ver los grupos que imparte un profesor
exports.getGroups = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const groupsFound = await Group.find({idTeacher: idTeacher}).populate('idTeacher');
        if(groupsFound.length != 0){
            return res.status(200).send({groupsFound});
        }else{
            return res.status(404).send({message: 'You do not have groups in your charge'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un grupo en específico
exports.getGroup = async(req, res)=>{
    try{
        const idGroup = req.params.idGroup;
        const groupFound = await Group.findOne({_id: idGroup});
        if(groupFound){
            return res.status(200).send({groupFound});
        }else{
            return res.status(404).send({message: 'This group no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver los alumnos de un grupo
exports.getAlumns = async(req, res)=>{
    try{
        const idGroup = req.params.idGroup;
        const alumnsFound = await Alumn.find({idGroup: idGroup}).populate('idGroup');
        if(alumnsFound.length != 0){
            return res.status(200).send({alumnsFound})  
        }else{
            return res.status(404).send({message: 'There are no alums'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un alumno
exports.getAlumn = async(req, res)=>{
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

//Función para ver los reportes de un alumno
exports.getReportsAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const reportsFound = await Report.find({idAlumn: idAlumn});
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

//Función para ver la calificación de un alumno
exports.getQualificationAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const qualificationFound = await Qualification.findOne({idAlumn: idAlumn});
        if(qualificationFound){
            return res.status(200).send({qualificationFound});
        }else{
            return res.status(404).send({message: 'This student does not have a qualification'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver el perfil de un alumno
exports.getProfileAlumn = async(req, res)=>{
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

//Función para ver el perfil de un profesor
exports.getProfile = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const teacherFound = await Teacher.findOne({_id: idTeacher});
        if(teacherFound){
            return res.status(200).send({teacherFound});
        }else{
            return res.status(404).send({message: 'Your profile no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para editar el perfil de un profesor
exports.updateProfile = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const params = req.body;
        const data = {
            name: params.name,
            email: params.email,
            usernameTeacher: params.usernameTeacher
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const teacher = await Teacher.findOne({_id: idTeacher});
            if(teacher){
                if(teacher.usernameTeacher != params.usernameTeacher){
                    const teacherFound = await Teacher.findOne({usernameTeacher: params.usernameTeacher});
                    if(teacherFound){
                        return res.status(400).send({message: 'This teacher username already exist'});
                    }else{
                        const teacherUpdated = await Teacher.findOneAndUpdate({_id: idTeacher}, data, {new:true});
                        return res.status(200).send({message: 'Teacher updated successfully'});
                    }
                }else{
                    const teacherUpdated = await Teacher.findOneAndUpdate({_id: idTeacher}, data, {new:true});
                    return res.status(200).send({message: 'Teacher updated successfully'});
                }
            }else{
                return res.status(404).send({message: 'This teacher no longer exists'}); 
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para crear a un alumno
exports.createAlumn = async(req, res)=>{
    try{
        const idGroup = req.params.idGroup;
        const idSupervisor = req.params.idSupervisor;
        const params = req.body;
        const data = {
            name: params.name,
            carnet: params.carnet,
            email: params.email,
            usernameAlumn: params.usernameAlumn,
            passwordAlumn: params.passwordAlumn,
            hoursDone: 0,
            idGroup: idGroup,
            idSupervisor: idSupervisor,
            role: 'ALUMN'
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let alumnFound = await Alumn.findOne({usernameAlumn: params.usernameAlumn});
            if(alumnFound){
                return res.status(400).send({message: 'This alumn username already exist.'});
            }else{
                data.passwordAlumn = await encryptPassword(params.passwordAlumn);
                let alumn = new Alumn(data);
                await alumn.save();
                return res.status(200).send({message: 'Alumn created successfully.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver todos los supervisores
exports.getSupervisors = async(req, res)=>{
    try{
        const supervisorsFound = await Supervisor.find();
        if(supervisorsFound.length != 0){
            return res.status(200).send({supervisorsFound});
        }else{
            return res.status(404).send({message: 'There are no supervisors'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}