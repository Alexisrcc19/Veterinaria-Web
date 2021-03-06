var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Historial = thinky.createModel("Historial", {
    visible: type.boolean(),
    id_mascota: type.string(),
    enfermedades: type.string(),
    estado: type.string(),
    causa:type.string(),
    tratamiento:type.string(),
    external_id: type.string().default(r.uuid())
});

module.exports = Historial;
var Mascota = require('./mascota');
Historial.belongsTo(Mascota, "mascota", "id_mascota", "id");


