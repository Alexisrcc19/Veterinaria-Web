var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Persona = thinky.createModel("Persona", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    nombre: type.string(),
    apellido: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    cedula: type.string(),
    id_rolPersona: type.string()
});

module.exports = Persona;
//relacion de cliente y rol
var Rol = require('./rol');
Persona.belongsTo(Rol, "rol", "id_rolPersona", "id");
//relacion de cliente y cuenta
var Cuenta = require("./cuenta");
Persona.hasOne(Cuenta, "cuenta", "id", "id_persona");
//relacion de cliente y mascota
var Mascota = require('./mascota');
Persona.hasMany(Mascota, "mascota", "id", "id_cliente");

