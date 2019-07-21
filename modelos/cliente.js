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
var Mascota = require('./mascota');
Cliente.hasMany(Mascota, "cliente", "id_cliente", "id_mascota");
var Cita = require('./cita');
Cliente.hasOne(Cita, "cita", "id_cliente", "id_cita");
var Pago = require('./pago');
Cliente.hasMany(Pago, "pago", "id_cliente", "id_pago");
var Cuenta = require('./cita');
Cliente.belongsTo(Cuenta, "cuenta", "id_cliente", "id_cuenta");


