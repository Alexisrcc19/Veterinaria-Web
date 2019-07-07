var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cliente = thinky.createModel("Cliente", {
    id_cliente: type.string(),
    correo: type.string(),
    nombre: type.string(),
    apellido: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    cedula: type.string()
});

module.exports = Cliente;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



