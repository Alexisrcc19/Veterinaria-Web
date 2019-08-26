'use strict';
var foro = require('../modelos/foro');
/**
 * @description foroControlador
 */
class foroControlador {
    /**
     * @description método que nos permite cargar datos del foro en un modal para el veterinario y responder
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    cargardatosForo(req, res) {
        var external = req.query.external;
        foro.filter({ external_id: external, visible: true }).then(function (resultPM) {
            // res.send(resultP);
            var foroF = resultPM[0];
            res.json(foroF);
        }).error(function (error) {
        });
    }
    /**
         * @description método que nos permite listar los foros en la vista del veterinario
         * @param {req} req objeto petición
         * @param {res} res objeto respuesta 
         */
    listadoForoVeterinario(req, res) {
        foro.filter({ visible: true }).then(function (listado) {
            res.render('index', {
                title: 'Foro', fragmento: 'foroVeterinario',
                inicio: 'inicio',
                listado: listado,
                ventanas: "ventanas"
                , msg: {
                    error: req.flash('error'),
                    info: req.flash('info'),
                    ok: req.flash('success')
                }
            });
        });
    }
    /**
     * @description método que nos permite listar temas del foro en la vista del cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    listadoForo(req, res) {
        foro.filter({ visible: true }).then(function (listado) {
            res.render('index', {
                title: 'Foro',
                fragmento: 'foro',
                inicio: 'inicio',
                listado: listado,
                ventanas: "ventanas"
                , msg: {
                    error: req.flash('error'),
                    info: req.flash('info'),
                    ok: req.flash('success')
                }
            });
        });
    }
    /**
     * @description método que nos permite guardar el foro enviado por el cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    guardar(req, res) {
        var data = {
            visible: true,
            persona: req.body.nombre,
            foro: req.body.foro,
            fecha: req.body.fecha,
            respuesta: "Aún no tienes respuesta",
            veterinario: ""
        };
        var ForoP = new foro(data);
        ForoP.save().then(function () {
            req.flash('success', 'Tema registrado, un veterinario respondera su tema');
            res.redirect('/foro');
        }).error(function () {
            req.flash('error', 'No se pudo guardar');
            res.redirect('/foro');
        });
    }
    /**
     * @description método que nos permite responder un foro desde el veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    responder(req, res) {
        var vet = req.session.cuenta.usuario;
        foro.filter({ external_id: req.body.externalF, visible: true }).then(function (resultM) {
            if (resultM.length > 0) {
                var ForoP = resultM[0];
                ForoP.respuesta = req.body.respuestaF;
                ForoP.veterinario = "del Doc. " + vet;
                ForoP.saveAll().then(function (actualizadoM) {
                    req.flash('success', 'Respuesta guardada');
                    res.redirect('/foroVeterinario');
                }).error(function (error) {
                    req.flash('error', 'error al responder');
                    res.redirect('/foroVeterinario');
                });
            }
        });
    }
}
module.exports = (foroControlador);


