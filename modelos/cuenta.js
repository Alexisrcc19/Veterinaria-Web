var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
    var Cuenta = thinky.createModel("Cuenta", {
    id_cuenta: type.string(),
    correo: type.string(),
    usuario: type.string(),
    clave: type.string()

});

module.exports = Cuenta;
var Veterinario = require('./Veterinario');
Cuenta.belongsTo(Veterinario,"cuenta","id_cuenta","id_veterinario");
var Cliente = require('./cliente');
Cuenta.hasOne(Cliente, "cliente", "id_cuenta", "id_cliente");


