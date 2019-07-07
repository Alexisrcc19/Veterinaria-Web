var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("Rol", {
    id_rol: type.string(),
    nombre: type.string()
    });

module.exports = Rol;
var Veterinario = require('./Veterinario');
Rol.belongsTo(Veterinario, "rol", "id_rol", "id_veterinario");


