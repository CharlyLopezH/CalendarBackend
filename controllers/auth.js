const {response}=require('express');

const crearUsuario = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'Post - Registrar new'
    })
}

const loginUsuario = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'Post - Login'
    })
}

const revalidarToken = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'Revalidar'
    })
}


module.exports = {crearUsuario,
    loginUsuario,
    revalidarToken
};