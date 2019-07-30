'use strict';
var rol = require('../modelos/rol');
var veterianrio = require('../modelos/Veterinario');
var cuenta = require('../modelos/cuenta');
class MascotaControl {
    visualizar(req, res) {
        res.render('registroMascota', {title: 'Veterinaria',
             msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
}
module.exports = MascotaControl;








