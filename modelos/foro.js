var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Foro = thinky.createModel("Foro", {
    id: type.string(),
    persona:type.string(),
    respuesta:type.string(),
    foro: type.string(),
    fecha: type.string(),
    veterinario: type.string(),
    external_id: type.string().default(r.uuid())
    });

module.exports = Foro;



