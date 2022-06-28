'use strict'

const jwt = require('jwt-simple');
const secretKey = 'llave';

//Middleware para verficar que esté logeado

exports.isLoged = (req, res, next)=>{
    if(req.headers.authorization){
        try{
            let token = req.headers.authorization.replace(/['",]+/g, '');
            let payload = jwt.decode(token, secretKey);
            req.user = payload;
            next();
        }catch(err){
            console.log(err);
            return err;
        }
    }else{
        return res.status(401).send({message: 'The request does not contain the authentication header'});
    }      
}

//Middleware para verificar que sea admin
exports.isAdmin = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'ADMIN'){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Middleware para verificar que sea supervisor
exports.isSupervisor = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'SUPERVISOR'){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Middleware para verificar que sea maestro
exports.isTeacher = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'TEACHER'){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Middleware para verificar que sea alumno
exports.isAlumn = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'ALUMN'){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

