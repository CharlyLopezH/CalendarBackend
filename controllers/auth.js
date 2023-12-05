const {response}=require('express');
const {validationResult} = require('express-validator');

//Login
const loginUsuario = (req,res=response)=>{
    
    const {email,password} = req.body;
    res.status(201).json({
        ok:true,
        msg:'Post - Login ok',
        password,
        email
    })
}


//New
const crearUsuario = (req,res=response)=>{
    console.log('En el crear');
    const {name,email,password} = req.body;
    res.status(201).json({
        ok:true,
        msg:'Post - Registrar new',
        name,
        email,
        password
    })
}


const revalidarToken = (req,res=response)=>{
    console.log('Renew');
    res.json({
        ok:true,
        msg:'Revalidar'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};