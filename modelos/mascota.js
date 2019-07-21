var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Mascota = thinky.createModel("Mascota", {
    id_mascota: type.string(),
    raza: type.string(),
    nombre: type.string(),
    edad: type.string(),
    tipo: type.string(),
    });

module.exports = Mascota;
var Historial = require('./historial');
Mascota.belongsTo(Historial, "mascota", "id_mascota", "id_historial");
var Cliente = require('./cliente');
Mascota.belongsTo(Cliente,"mascotaC","id_mascota","id_cliente");



