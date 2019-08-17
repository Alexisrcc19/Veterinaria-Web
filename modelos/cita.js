var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cita = thinky.createModel("Cita", {
    id_cita: type.string(),
    tipo: type.string(),
    fecha: type.string(),
    hora: type.string(),
    area: type.string(),
    });

module.exports = Cita;
var persona = require('./persona');
Cita.belongsTo(persona, "persona", "id_cita", "id_cliente");



