var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Comentario = thinky.createModel("Comentario", {
    visible: type.boolean(),
    comentarios: type.string(),
    cliente: type.string(),
    id_comentario: type.string(),
    id: type.string(),
    external_id: type.string().default(r.uuid())
});
module.exports = Comentario;



