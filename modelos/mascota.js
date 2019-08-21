var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Mascota = thinky.createModel("Mascota", {
    nro_historial: type.string(),
    raza: type.string(),
    nombre: type.string(),
    edad: type.string(),
    sexo: type.string(),
    tipo: type.string(),
    especie: type.string(),
    id_cliente: type.string(),
    id_historial: type.string(),
    external_id: type.string().default(r.uuid())
});

module.exports = Mascota;
var Historial = require('./historial');
Mascota.hasMany(Historial, "historial", "id", "id_mascota");
//relacion de mascota y cliente
var Persona = require('./persona');
Mascota.belongsTo(Persona, "persona", "id_cliente", "id");



