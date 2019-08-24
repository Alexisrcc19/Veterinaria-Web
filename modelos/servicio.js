var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Servicio = thinky.createModel("Servicio", {
    visible: type.boolean(),
    id: type.string(),
    nombre: type.string(),
    formaPago: type.string(),
    valor:type.string()
    });

module.exports = Servicio;

