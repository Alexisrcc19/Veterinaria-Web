var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Mascota = thinky.createModel("Mascota", {
    id_mascota: type.string(),
    id_cliente: type.string(),
    raza: type.string(),
    nombre: type.string(),
    edad: type.string(),
    tipo: type.string(),
    });

module.exports = Mascota;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



