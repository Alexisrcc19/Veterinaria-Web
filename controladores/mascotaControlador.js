'use strict';
var cliente = require('../modelos/cliente');
var mascota = require('../modelos/mascota');


class MascotaControl {
    visualizar(req, res) {
        res.render('index', {title: 'Veterinaria', fragmento: 'registroMascota',
            msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
    guardar(req, res) {
        var idper = req.session.cuenta.external;
        var data = {
            raza: req.body.raza,
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipo: req.body.tipo,
            especie: req.body.especie,
            id_cliente: idper
        };
        var mascotaD = new mascota(data);
        mascotaD.save().then(function (guardar) {
            req.flash('info', 'mascota registrada');
            res.redirect('/registroMascota');
        }).error(function (error) {
            req.flash('error', 'No se pudo guardar');
            res.redirect('/');
        });
    }
}
module.exports = MascotaControl;








