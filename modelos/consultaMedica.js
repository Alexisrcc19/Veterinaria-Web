var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var consultaMedica = thinky.createModel("consultaMedica", {
    id_consulta: type.string(),
    id_veterinario: type.string(),
    id_historia: type.string(),
    hora_consulta: type.string(),
    fecha_consulta: type.string(),
});

module.exports = consultaMedica;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



