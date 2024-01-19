const { response } = require("express");
const mongoose = require('mongoose');
const Evento = require('../models/Evento');



//Controller buscado por la definición de ruta; requiere token activo
const getEventos = async (req, res = response) => {
  console.log('getEventos...');

  const eventos = await Evento.find().populate('user','name');
  res.json({
    ok: true,
    eventos
  });
}

//Implementacion de controller usado en routes>events.js; requiere token válido
const crearEvento = async (req,res=response) => {

  //const {title, start, end} = req.body;
  //Verificar que viene el evento
  // Grabar en la BD
  const evento=new  Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok:true,
      evento:eventoGuardado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg:'Hablar con el administrador'
    });
  }
  
}

const actualizarEvento = async( req, res = response ) => {
    
  const eventoId = req.params.id;
  const uid = req.uid;

   // Verificar si el eventoId es un ObjectId válido
   if (!mongoose.Types.ObjectId.isValid(eventoId)) {
    return res.status(400).json({
      ok: false,
      msg: 'El formato del ID del evento no es válido'
    });
  }

  try {

      const evento = await Evento.findById( eventoId );

      if ( !evento ) {
          return res.status(404).json({
              ok: false,
              msg: 'Evento no existe por ese id'
          });
      }

      if ( evento.user.toString() !== uid ) {
          return res.status(401).json({
              ok: false,
              msg: 'No tiene privilegio de editar este evento'
          });
      }

      const nuevoEvento = {
          ...req.body,
          user: uid
      }

      const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

      res.json({
          ok: true,
          evento: eventoActualizado
      });

      
  } catch (error) {
      console.log(error);
     res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}

//Eliminar Evento
const eliminarEvento = async (req,res=response)=> {

  const eventoId = req.params.id;
  const uid = req.uid;

  if (!mongoose.Types.ObjectId.isValid(eventoId)) {
    return res.status(400).json({
      ok: false,
      msg: 'El formato del ID del evento no es válido'
    });
  }


  //Si el eventoId tiene un formato válido... intentar
  try {
  const evento = await Evento.findById( eventoId );
    if ( !evento ) {
      return res.status(404).json({
          ok: false,
          msg: 'Evento no existe por ese id'
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
          ok: false,
          msg: 'No tiene privilegio de eliminar este evento'
      });
  }


    //Si llegamos hasta aquí y no hubo error, podemos borrar el registro con el id
    const eventoEliminado = await Evento.findByIdAndDelete( eventoId );
    res.json({
        ok: true,
        msg: `Evento ${eventoId} eliminado`
    });

    

  } catch (error) {
    console.log(error);
   return  res.status(500).json({
    ok: false,
    msg: 'Hable con el administrador'
    });  
  } 
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}