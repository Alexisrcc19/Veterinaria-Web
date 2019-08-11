var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cliente = thinky.createModel("Cliente", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    nombre: type.string(),
    apellido: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    cedula: type.string(),
    id_rolUsuario: type.string()
});

module.exports = Cliente;
//relacion de cliente y rol
var Rol = require('./rol');
Cliente.belongsTo(Rol, "rol", "id_rolUsuario", "id");
//relacion de cliente y cuenta
var Cuenta = require("./cuenta");
Cliente.hasOne(Cuenta, "cuenta", "id", "id_usuario");
//relacion de cliente y mascota
var Mascota = require('./mascota');
Cliente.hasMany(Mascota, "mascota", "id", "id_cliente");

