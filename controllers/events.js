const { response } = require("express");
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
  const evento=new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok:true,
      evento:eventoGuardado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Hablar con el administrador'
    });
  }
  
}

const actualizarEvento = (req,res=response)=> { 
  
  const eventoId = req.params.id;
  console.log('eventoId antes del Try '+eventoId);
  
  try {
    const evento = Evento.findById( eventoId );        

    // El evento no existe, de hecho no existen ningún evento; sin embargo no entra al siguiente if
    if(!evento){
      return res.status(404).json(
        {
          ok:false,
          msg:'No existe evento con Id: '+eventoId
        }
        )
    }

  }catch(error) {
    console.log(error);
  }
  
res.json({  
    ok: true,
    msg: "actualizarEvento",
    eventoId
  });
}

const eliminarEvento = (req,res=response)=> {
  res.json({
    //12345345
    ok: true,
    msg: "eliminarEvento",
  });
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}