var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Pago = thinky.createModel("Pago", {
    visible: type.boolean(),
    id_pago: type.string(),
    tipo: type.string(),
    descripcion: type.string(),
    hora: type.string(),
    fecha: type.string(),
    });

module.exports = Pago;
var Cliente = require('./cliente');
Pago.belongsTo(Cliente, "pago", "id_pago", "id_cliente");



