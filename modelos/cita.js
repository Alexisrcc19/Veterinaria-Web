var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cita = thinky.createModel("Cita", {
    visible: type.boolean(),
    id: type.string(),
    tipo: type.string(),
    fecha: type.string(),
    hora: type.string(),
    estado:type.boolean(),
    id_mascota:type.string(),
    id_servicio: type.string()
    });

module.exports = Cita;
var persona = require('./persona');
Cita.belongsTo(persona, "persona", "id", "id_cliente");


