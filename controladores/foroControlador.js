

'use strict';
var foro = require('../modelos/foro');

class foroControlador {

   cargardatosForo(req, res) {
        var external = req.query.external;
        foro.filter({external_id: external,visible:true}).then(function (resultPM) {
            // res.send(resultP);
            var foroF = resultPM[0];
            res.json(foroF);
        }).error(function (error) {

        });

    }

    listadoForoVeterinario(req, res) {
        foro.filter({visible:true}).then(function (listado) {
            res.render('index', {title: 'Foro', fragmento: 'foroVeterinario', inicio: 'inicio', listado: listado
                , msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
        });
    }
    listadoForo(req, res) {
        foro.filter({visible:true}).then(function (listado) {
            res.render('index', {title: 'Foro', fragmento: 'foro', inicio: 'inicio', listado: listado
                , msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
        });
    }
    guardar(req, res) {
        var data = {
            visible:true,
            persona: req.body.nombre,
            foro: req.body.foro,
            fecha: req.body.fecha,
            respuesta: "aun no tiene respuesta",
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
     responder(req, res) {
         var vet = req.session.cuenta.usuario;
        foro.filter({external_id: req.body.externalF,visible:true}).then(function (resultM) {
            if (resultM.length > 0) {
                var ForoP = resultM[0];
                ForoP.respuesta = req.body.respuestaF;
                ForoP.veterinario = "del Doc. "+vet;
                ForoP.saveAll().then(function (actualizadoM) {
                    req.flash('success', 'Respuesta guardada');
                    res.redirect('/foroVeterinario');
                }).error(function (error) {
                    // req.flash('modificado con exito');
                    req.flash('error', 'error al responder');
                    res.redirect('/foroVeterinario');

                });

            }
        });

    }
}
module.exports = (foroControlador);


