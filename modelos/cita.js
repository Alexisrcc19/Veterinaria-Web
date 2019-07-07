var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cita = thinky.createModel("Cita", {
    id_cita: type.string(),
    id_cliente: type.string(),
    tipo: type.string(),
    fecha: type.string(),
    hora: type.string(),
    area: type.string(),
    });

module.exports = Cita;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



