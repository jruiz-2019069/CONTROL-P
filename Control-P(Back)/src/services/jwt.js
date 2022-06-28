'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'llave';

//Función para crear un token dependiendo del rol del usuario
exports.createToken = async(user)=>{
    try{
        if(user.role == 'ADMIN'){
            const payload = {
                sub: user._id,
                name: user.name,
                usernameAdmin: user.usernameAdmin,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else if(user.role == 'SUPERVISOR'){
            const payload = {
                sub: user._id,
                name: user.name,
                nameCompany: user.nameCompany,
                email: user.email,
                usernameSupervisor: user.usernameSupervisor,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else if(user.role == 'TEACHER'){
            const payload = {
                sub: user._id,
                name: user.name,
                email: user.email,
                usernameTeacher: user.usernameTeacher,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else{
            const payload = {
                sub: user._id,
                name: user.name,
                carnet: user.carnet,
                email: user.email,
                usernameAlumn: user.usernameAlumn,
                hoursDone: user.hoursDone,
                idGroup: user.idGroup,
                idSupervisor: user.idSupervisor,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
