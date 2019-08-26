var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Pago = thinky.createModel("Pago", {
    visible: type.boolean(),
    id_pago: type.string(),
    tipo: type.string(),
    hora: type.string(),
    fecha: type.string(),
    id: type.string(),
    valor: type.string(),
    external_id: type.string().default(r.uuid())
});

module.exports = Pago;
var Cliente = require('./persona');
Pago.belongsTo(Cliente, "pago", "id_pago", "id_cliente");



