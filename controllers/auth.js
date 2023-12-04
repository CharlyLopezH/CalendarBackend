const {response}=require('express');
const {validationResult} = require('express-validator');

const crearUsuario = (req,res=response)=>{
    console.log('En el crear');
    const {name,email,password} = req.body;

    //Manejo de errores
    const errors=validationResult(req);
    if(!errors.isEmpty()){
    //console.log(errors);
    return res.status(400).json({
        ok:false,   
        errors:errors.mapped()
    })
    }    

    res.status(201).json({
        ok:true,
        msg:'Post - Registrar new',
        name,
        email,
        password
    })
}

const loginUsuario = (req,res=response)=>{
    //console.log('En el login');
    const errors=validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json ({
            ok:false,
            errors:errors.mapped()
        })
        
    }

    res.status(201).json({
        ok:true,
        msg:'Post - Login ok'
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