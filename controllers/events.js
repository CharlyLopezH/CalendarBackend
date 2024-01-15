const { response } = require("express");

const getEventos = (req, res = response) => {
  console.log('Aqui voy....');
  res.json({
    ok: true,
    msg: "getEventos",
  });

}

 const crearEvento = (req,res=response) => {
  res.json({
    ok: true,
    msg: "crearEvento",
  });
}

const actualizarEvento = (req,res=response)=> { 
res.json({
    //12345345
    ok: true,
    msg: "actualizarEvento",
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