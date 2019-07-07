var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Pago = thinky.createModel("Pago", {
    id_pago: type.string(),
    id_cliente: type.string(),
    tipo: type.string(),
    descripcion: type.string(),
    hora: type.string(),
    fecha: type.string(),
    });

module.exports = Pago;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



