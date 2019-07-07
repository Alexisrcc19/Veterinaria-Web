var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Historial = thinky.createModel("Historial", {
    id_historial: type.string(),
    id_mascota: type.string(),
    nombre: type.string(),
    num_historial: type.string(),
    edad: type.string(),
    enfermedades: type.string(),
    sexo: type.string(),
    estado: type.string()
});

module.exports = Historial;
var ConsultaMedica = require('./consultaMedica');
Historial.hasOne(ConsultaMedica, "historial", "id_historial", "id_consulta");
var Mascota = require('./mascota');
Historial.hasOne(Mascota, "mascota", "id_historial", "id_mascota");


