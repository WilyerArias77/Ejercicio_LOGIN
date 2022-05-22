var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario = new Schema({
  nombre: String,
  apellido: String,
  usuario: String,
  email:String,
  direccion: String, 
  pais:String,
  estado:String,
  codigopostal: String,
  mayorEdad:String,
  terminosYcondiciones: String,
  contrasena: String

});

module.exports = mongoose.model("usuarios", usuario);
