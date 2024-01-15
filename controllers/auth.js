const {response}=require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

//New
//async, se espera...

const getUsuarios = (req,res=response)=> {
    console.log('Lista de usuarios');
    res(
        {
        
            ok:true,
            msg:'Listar usuarios'
        }    
    )
}

const crearUsuario = async (req,res=response)=>{
    
    const {email, password} = req.body;    
    console.log('El email está Ok:' +email);

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

         //Generar Token
         const token = await generarJWT(usuario.id, usuario.name);

         res.status(201).json({
            ok:true,
            msg:'Post - Registrar new',
            uid:usuario.id,
            name:usuario.name,
            token
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
    console.log('Hasta aquí todo Ok-->>'+email+'/'+password);

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
        //Generar token
        const token = await generarJWT(usuario.id, usuario.name);

    //Si pwd válido    
    res.json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        token
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


const revalidarToken = async (req,res=response)=>{
    console.log('Renovando...');
    // const uid=req.uid;
    // const name=req.name;

    const {uid,name} = req;

    // Generar nuevo JWT y retornarlo en esa petición

    const token = await generarJWT(uid,name);

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    getUsuarios,
    crearUsuario,
    loginUsuario,
    revalidarToken
};