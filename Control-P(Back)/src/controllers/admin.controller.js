'use strict'

const Admin = require('../models/admin.model');
const Group = require('../models/group.model');
const Supervisor = require('../models/supervisor.model');
const Teacher = require('../models/teacher.model');
const Alumn = require('../models/alumn.model');
const Report = require('../models/report.model');
const Qualification = require('../models/qualification.model')
const jwt = require('../services/jwt');
const {dataObligatory, encryptPassword, dencryptPassword} = require('../utils/validate');

exports.testAdminController = (req, res)=>{
    return res.send({message: 'The function test admin controller is running'});
}

//Función para crear un administrador
exports.createAdmin = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            usernameAdmin: params.usernameAdmin,
            passwordAdmin: params.passwordAdmin,
            role: 'ADMIN'
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let adminFound = await Admin.findOne({usernameAdmin: params.usernameAdmin});
            if(adminFound){
                return res.status(400).send({message: 'This admin username already exist'});
            }else{
                data.passwordAdmin = await encryptPassword(params.passwordAdmin);
                let admin = new Admin(data);
                await admin.save();
                return res.status(200).send({message: 'Admin created successfully'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para logearse
exports.login = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let adminFound = await Admin.findOne({usernameAdmin: params.username});
            let supervisorFound = await Supervisor.findOne({usernameSupervisor: params.username});
            let teacherFound = await Teacher.findOne({usernameTeacher: params.username});
            let alumnFound = await Alumn.findOne({usernameAlumn: params.username});
            if(adminFound && await dencryptPassword(params.password, adminFound.passwordAdmin)){
                const token = await jwt.createToken(adminFound);
                return res.status(200).send({token, adminFound, message: 'Entering the system...'});
            }else if(supervisorFound && await dencryptPassword(params.password, supervisorFound.passwordSupervisor)){
                const token = await jwt.createToken(supervisorFound);
                return res.status(200).send({token, supervisorFound, message: 'Entering the system...'});
            }else if(teacherFound && await dencryptPassword(params.password, teacherFound.passwordTeacher)){
                const token = await jwt.createToken(teacherFound);
                return res.status(200).send({token, teacherFound, message: 'Entering the system...'});
            }else if(alumnFound && await dencryptPassword(params.password, alumnFound.passwordAlumn)){
                const token = await jwt.createToken(alumnFound);
                return res.status(200).send({token, alumnFound, message: 'Entering the system...'});
            }else{
                return res.status(403).send({message: 'Incorrect username or password'});
            }
        }
    }catch(err){
        console.log(err);
        return errr;
    }
}

//Función para agregar un supervisor
exports.createSupervisor = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            nameCompany: params.nameCompany,
            email: params.email,
            usernameSupervisor: params.usernameSupervisor,
            passwordSupervisor: params.passwordSupervisor,
            role: 'SUPERVISOR'
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let supervisorFound = await Supervisor.findOne({usernameSupervisor: params.usernameSupervisor});
            if(supervisorFound){
                return res.status(400).send({message: 'This supervisor username already exist'});
            }else{
                data.passwordSupervisor = await encryptPassword(params.passwordSupervisor);
                let supervisor = new Supervisor(data);
                await supervisor.save();
                return res.status(200).send({message: 'Supervisor created successfully'});
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

//Función para ver un supervisor
exports.getSupervisor = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const supervisorFound = await Supervisor.findOne({_id: idSupervisor});
        if(supervisorFound){
            return res.status(200).send({supervisorFound});
        }else{
            return res.status(404).send({message: 'This supervisor no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para editar un supervisor
exports.updateSupervisor = async(req, res)=>{
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
                        return res.status(200).send({message: 'Supervisor updated successfully'});
                    }
                }else{
                    const supervisorUpdated = await Supervisor.findOneAndUpdate({_id: idSupervisor}, data, {new:true});
                    return res.status(200).send({message: 'Supervisor updated successfully'});
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

//Función para eliminar un supervisor
exports.deleteSupervisor = async(req, res)=>{
    try{
        const idSupervisor = req.params.idSupervisor;
        const supervisor = await Supervisor.findOne({_id: idSupervisor});
        if(supervisor){
            const alumn = await Alumn.findOne({idSupervisor: idSupervisor});
            if(!alumn){
                const supervisorDeleted = await Supervisor.findOneAndDelete({_id: idSupervisor});
                return res.status(200).send({message: 'Supervisor deleted successfully'})
            }else{
                return res.status(400).send({message: 'This supervisor is in charge of some students'});
            }
        }else{
            return res.status(404).send({message: 'This supervisor no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para crear un profesor
exports.createTeacher = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            email: params.email,
            usernameTeacher: params.usernameTeacher,
            passwordTeacher: params.passwordTeacher,
            role: 'TEACHER'
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let teacherFound = await Teacher.findOne({usernameTeacher: params.usernameTeacher});
            if(teacherFound){
                return res.status(400).send({message: 'This teacher username already exist'});
            }else{
                data.passwordTeacher = await encryptPassword(params.passwordTeacher);
                let teacher = new Teacher(data);
                await teacher.save();
                return res.status(200).send({message: 'Teacher created successfully'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver todos los profesores
exports.getTeachers = async(req, res)=>{
    try{
        const teachersFound = await Teacher.find();
        if(teachersFound.length != 0){
            return res.status(200).send({teachersFound});
        }else{
            return res.status(404).send({message: 'There are no teachers'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un profesor
exports.getTeacher = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const teacherFound = await Teacher.findOne({_id: idTeacher});
        if(teacherFound){
            return res.status(200).send({teacherFound});
        }else{
            return res.status(404).send({message: 'This teacher no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para editar un profesor
exports.updateTeacher = async(req, res)=>{
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

//Función para eliminar un profesor
exports.deleteTeacher = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const teacher = await Teacher.findOne({_id: idTeacher});
        if(teacher){
            const group = await Group.findOne({idTeacher: idTeacher});
            if(!group){
                const teacherDeleted = await Teacher.findOneAndDelete({_id: idTeacher});
                return res.status(200).send({message: 'Teacher deleted successfully'})
            }else{
                return res.status(400).send({message: 'This teacher is in charge of some groups'});
            }
        }else{
            return res.status(404).send({message: 'This teacher no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para crear un grupo
exports.createGroup = async(req, res)=>{
    try{
        const idTeacher = req.params.idTeacher;
        const params = req.body;
        const data = {
            code: params.code.toUpperCase(),
            career: params.career,
            time: params.time,
            section: params.section.toUpperCase(),
            idTeacher: idTeacher
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            let groupFound = await Group.findOne({code: data.code, section:data.section});
            if(groupFound){
                return res.status(400).send({message: 'This group already exist'});
            }else{
                let group = new Group(data);
                await group.save();
                return res.status(200).send({message: 'Group created successfully'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver todos los grupos
exports.getGroups = async(req, res)=>{
    try{
        const groupsFound = await Group.find().populate('idTeacher');
        if(groupsFound.length != 0){
            return res.status(200).send({groupsFound});
        }else{
            return res.status(404).send({message: 'There are no groups'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un grupo
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

//Función para editar un grupo
exports.updateGroup = async(req, res)=>{
    try{
        const idGroup = req.params.idGroup;
        const idTeacher = req.params.idTeacher
        const params = req.body;
        const data = {
            code: params.code.toUpperCase(),
            career: params.career,
            time: params.time,
            section: params.section.toUpperCase()
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const group = await Group.findOne({_id: idGroup});
            if(group){
                if(group.code != data.code){
                    const groupFound = await Group.findOne({code: data.code});
                    if(groupFound){
                        return res.status(400).send({message: 'This group already exist'});
                    }else{
                        const groupUpdated = await Group.findOneAndUpdate({_id: idGroup}, data, {new:true});
                        return res.status(200).send({message: 'Group updated successfully'});
                    }
                }else{
                    const groupUpdated = await Group.findOneAndUpdate({_id: idGroup}, data, {new:true});
                    return res.status(200).send({message: 'Group updated successfully'});
                }
            }else{
                return res.status(404).send({message: 'This group no longer exists'}); 
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar un grupo
exports.deleteGroup = async(req, res)=>{
    try{
        const idGroup = req.params.idGroup;
        const group = await Group.findOne({_id: idGroup});
        if(group){
            const alumn = await Alumn.findOne({idGroup: idGroup});
            if(!alumn){
                const groupDeleted = await Group.findOneAndDelete({_id: idGroup});
                return res.status(200).send({message: 'Group deleted successfully'})
            }else{
                return res.status(400).send({message: 'In this group there are students'});
            }
        }else{
            return res.status(404).send({message: 'This group no longer exists'}); 
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

//Función para ver todos los alumnos
exports.getAlumns = async(req, res)=>{
    try{
        const alumnsFound = await Alumn.find().populate('idGroup');
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

//Función para obtener un alumno
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

//Función para editar un alumno
exports.updateAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const params = req.body;
        const data = {
            name: params.name,
            carnet: params.carnet,
            email: params.email,
            usernameAlumn: params.usernameAlumn,
            hoursDone: params.hoursDone,
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const alumn = await Alumn.findOne({_id: idAlumn});
            if(alumn){
                if(alumn.usernameAlumn != params.usernameAlumn){
                    const alumnFound = await Alumn.findOne({usernameAlumn: params.usernameAlumn});
                    if(alumnFound){
                        return res.status(400).send({message: 'This alumn username already exist'});
                    }else{
                        const alumnUpdated = await Alumn.findOneAndUpdate({_id: idAlumn}, data, {new:true});
                        return res.status(200).send({message: 'Alumn updated successfully'});
                    }
                }else{
                    const alumnUpdated = await Alumn.findOneAndUpdate({_id: idAlumn}, data, {new:true});
                    return res.status(200).send({message: 'Alumn updated successfully'});
            }
            }else{
                return res.status(404).send({message: 'This alumn no longer exists'}); 
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar un alumno
exports.deleteAlumn = async(req, res)=>{
    try{
        const idAlumn = req.params.idAlumn;
        const alumn = await Alumn.findOne({_id: idAlumn});
        if(alumn){
            const alumnQualification = await Qualification.findOneAndDelete({idAlumn: idAlumn});
            const alumnReports = await Report.deleteMany({idAlumn: idAlumn});
            const alumnDeleted = await Alumn.findOneAndDelete({_id: idAlumn});
            return res.status(200).send({message: 'Alumn deleted successfully'})
        }else{
            return res.status(404).send({message: 'This alumn no longer exists'}); 
        }
    }catch(err){
        console.log(err);
        return err;
    }
}