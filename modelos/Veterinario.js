var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Veterinario = thinky.createModel("Veterinario", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    nombre: type.string(),
    apellido: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    cedula: type.string(),
    id_rolVeterinario: type.string()
});

module.exports = Veterinario;
var Rol = require('./rol');
Veterinario.belongsTo(Rol, "rol", "id_rolVeterinario", "id");
var Cuenta = require("./cuenta");
Veterinario.hasOne(Cuenta, "cuenta", "id", "id_veterinario");



