const {response}=require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

//New
//async, se espera...
const crearUsuario = async (req,res=response)=>{
    console.log('En el /new: crearUsuario: '+req.name);

    const {name,email,password} = req.body;

    try { 

        let usuario = await Usuario.findOne({email});
        console.log(usuario);

        if (usuario) {
            return res.status(400).json ({
                ok:false,
                msg: 'Usuario existete: '+usuario.email
            });
        }
       
        // //Lo que viene del Body
         usuario = new Usuario(req.body);    
           
        
         //Encriptar contraseña
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync(password,salt);  

         //... Hasta que esto se graba o regresa error        
         await usuario.save();

    }  catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hablar al admin'
        })

    } 
    res.status(201).json({
        ok:true,
        msg:'Post - Registrar new'
    })
}

//Login
const loginUsuario = (req,res=response)=>{    
    console.log('En el login de auth controller')
    const {email,password} = req.body;
    console.log(email);
    res.status(201).json({
        ok:true,
        msg:'Post - Login ok',
        password,
        email
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