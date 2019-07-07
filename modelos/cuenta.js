var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
    var Cuenta = thinky.createModel("Cuenta", {
    id_cuenta: type.string(),
    correo: type.string(),
    usuario: type.string(),
    clave: type.string()

});

module.exports = Cuenta;
//var Rol = require('./rol');
//Veterinario.hasOne(Rol, "rol", "id_veterinario", "id_rol");



