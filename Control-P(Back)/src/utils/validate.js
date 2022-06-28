"use strict"

const bcrypt = require('bcrypt-nodejs');

//Función para validad que venga la data obligatoria.
exports.dataObligatory = async(data)=>{
    let keys = Object.keys(data);
    let msg = '';
    
    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `The param ${key} is required \n`;
    }
    return msg.trim();
}

//Función para encriptar una contraseña
exports.encryptPassword = async(password)=>{
    try{
        return bcrypt.hashSync(password);
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para desencriptar una contraseña
exports.dencryptPassword = async(password, hash)=>{
    try{
        return bcrypt.compareSync(password, hash);
    }catch(err){
        console.log(err);
        return err;
    }
}

