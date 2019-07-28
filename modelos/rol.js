var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("Rol", {
    id: type.string(),
    nombre: type.string()
    });

module.exports = Rol;
var Veterinario = require('./Veterinario');
Rol.hasMany(Veterinario, "veterinario", "id", "id_rolVeterinario");


