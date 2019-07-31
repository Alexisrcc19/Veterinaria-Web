var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
    var Cuenta = thinky.createModel("Cuenta", {
    correo: type.string(),
    usuario: type.string(),
    clave: type.string(),
    id_veterinario: type.string(),    
    id_usuario: type.string(),
    id: type.string(),
    external_id: type.string().default(r.uuid())
    

});

module.exports = Cuenta;
var Veterinario = require('./Veterinario');
Cuenta.belongsTo(Veterinario, "veterinario", "id_veterinario", "id")
var Cliente = require('./cliente');
Cuenta.belongsTo(Cliente, "cliente", "id_usuario", "id");



