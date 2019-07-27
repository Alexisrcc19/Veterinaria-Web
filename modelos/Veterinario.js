var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Veterinario = thinky.createModel("Veterinario", {
    correo: type.string(),
    nombre: type.string(),
    apellido: type.string(),
    direccion: type.string(),
    telefono: type.string(),
    cedula: type.string(),
    nro_registro: type.string()
});

module.exports = Veterinario;
var Rol = require('./rol');
Veterinario.hasOne(Rol, "veterinarioR", "id_veterinario", "id_rol");
var Cuenta = require("./cuenta");
Veterinario.hasOne(Cuenta, "cuenta", "id", "id_veterinario");;
var ConsultaMedica = require('./consultaMedica');
Veterinario.hasOne(ConsultaMedica, "veterinarioCM","id_veterinario","id_consulta");


