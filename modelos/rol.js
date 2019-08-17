var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("Rol", {
    id: type.string(),
    nombre: type.boolean()
    });

module.exports = Rol;
var Usuario = require('./persona');
Rol.hasMany(Usuario, "usuario", "id", "id_rolPersona");

