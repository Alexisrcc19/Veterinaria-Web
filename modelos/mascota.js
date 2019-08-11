var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Mascota = thinky.createModel("Mascota", {
    raza: type.string(),
    nombre: type.string(),
    edad: type.string(),
    tipo: type.string(),
    especie: type.string(),
    id_cliente: type.string()
    });

module.exports = Mascota;
var Historial = require('./historial');
Mascota.belongsTo(Historial, "mascota", "id_mascota", "id_historial");
//relacion de mascota y cliente
var Cliente = require('./cliente');
Mascota.belongsTo(Cliente, "cliente", "id_cliente", "id");



