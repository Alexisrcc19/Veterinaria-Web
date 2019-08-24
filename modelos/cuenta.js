var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Cuenta = thinky.createModel("Cuenta", {
    visible: type.boolean(),
    correo: type.string(),
    usuario: type.string(),
    clave: type.string(),
    id_persona: type.string(),
    id: type.string(),
    external_id: type.string().default(r.uuid())


});

module.exports = Cuenta;
var persona = require('./persona');
Cuenta.belongsTo(persona, "persona", "id_persona", "id");



