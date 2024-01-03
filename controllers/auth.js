const {response}=require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

//New
//async, se espera...
const crearUsuario = async (req,res=response)=>{
    
    const {email, password} = req.body;    
    console.log('El email:' +email);

    try { 
        let usuario = await Usuario.findOne({email});        

        //console.log('usuario: '+usuario);

         if (usuario) {
             return res.status(400).json ({
                 ok:false,
                 msg: 'Email repetido:'+usuario.email
             });
         }
                 
       

         //... Hasta que esto se graba o regresa error      
         usuario=new Usuario(req.body);  

           //Encriptar contraseña
           const salt = bcrypt.genSaltSync();
           usuario.password = bcrypt.hashSync(password,salt);  

         await usuario.save();

         res.status(201).json({
            ok:true,
            msg:'Post - Registrar new',
            uid:usuario.id,
            name:usuario.name
        })

    }  catch (error) {
        console.log('Error: '+error);
        res.status(500).json({
            ok:false,
            msg:'Hablar al admin!! '+error
        })

    } 
}

//Login
const loginUsuario = async (req,res=response)=>{    
    console.log('End point: http://localhost:4000/api/auth/')
    const {email,password} = req.body;
    console.log(email+'/'+password);

    try {
        const usuario = await Usuario.findOne({email});
        
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

        //Verificación - comparación de passwords
        const validPassword = bcrypt.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        } 
    //Si pwd válido    
    res.json({
        ok:true,
        msg:'Genear token'
    })

    } catch(error) {
        console.log(error);
        res.status(500).json
        ({
            ok:false, 
            msg:'Llama al admin...'
        })

    }

    res.status(201).json({
        ok:true,
        msg:'Post - Login ok, generar Token',
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