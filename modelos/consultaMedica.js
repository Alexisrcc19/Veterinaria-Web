var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var consultaMedica = thinky.createModel("consultaMedica", {
    id_consulta: type.string(),
    hora_consulta: type.string(),
    fecha_consulta: type.string(),
});

module.exports = consultaMedica;
var Persona = require('./persona');
consultaMedica.belongsTo(Persona, "persona", "id_consulta", "id_veterinario");
var Historial = require('./historial');
consultaMedica.belongsTo(Historial, "historial", "id_consulta", "id_historial");




