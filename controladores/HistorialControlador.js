
'use strict';
var mascota = require('../modelos/mascota');
var historial = require('../modelos/historial');
var persona = require('../modelos/persona');
var rol = require('../modelos/rol');
class HistorialController {
    listaHistorialMascotas(req, res) {
        rol.filter({nombre: false}).then(function (listado) {
            var rol = listado[0];
            var ver = rol.id;
            mascota.getJoin({persona: true}).then(function (lista) {
                res.render('index', {title: 'Historial', fragmento: 'veterinario/mascota/historial/listaHistorialMascotas', lista: lista, ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
console.log(lista)
            });
        });
    }
    verHistorial(req, res) {
        var masc = req.params.external;
        mascota.getJoin({historial: true}).filter({external_id: masc}).then(function (lista) {
            var ver = lista[0];
            var id = ver.id;
            historial.filter({id_mascota: id}).then(function (listado) {
                res.render('index', {title: 'Historial', fragmento: 'veterinario/mascota/historial/listaHistorial', listado: listado, lista: lista, ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
            });
        });
    }
    cargardatosHistorial(req, res) {
        var external = req.query.external;
        historial.filter({external_id: external}).then(function (resultPM) {
            // res.send(resultP);
            var his = resultPM[0];
            res.json(his);
        }).error(function (error) {

        });


    }
    guardarHistorial(req, res) {
        var external = req.body.externalMasc;
        mascota.filter({external_id: external}).then(function (datosM) {
            var masc = datosM[0];
            var data = {
                enfermedades: req.body.enfermedades,
                estado: req.body.estado,
                causa: req.body.causa,
                tratamiento: req.body.tratamiento,
                id_mascota: masc.id
            };

            var HistorialD = new historial(data);

            HistorialD.save().then(function () {
                req.flash('info', 'Historial registrado');
                res.redirect('/veterinario/mascota/listaHistorial/' + external);
            }).error(function () {
                req.flash('error', 'No se pudo guardar');
                res.redirect('/');
            });
        }).error(function (error) {
            res.filter('error', 'mascota registrado con exito');
            res.redirect('/veterinario/mascota/listaHistorial/' + external);
        });
    }
    modificarH(req, res) {
        var external = req.body.externalHistorialH;
        console.log(external + "---------------")
        historial.filter({external_id: external}).then(function (data) {
            if (data.length > 0) {
                var Historial = data[0];
                Historial.causa = req.body.causaH;
                Historial.estado = req.body.estadoH;
                Historial.enfermedades = req.body.enfermedadesH;
                Historial.tratamiento = req.body.tratamientoH;


                Historial.save().then(function () {
                    req.flash('info', 'histotial modificada');
                    res.redirect('/');
                }).error(function () {
                    req.flash('error', 'No se pudo modificar');
                    res.redirect('/');
                });

            } else {
                req.flash('error', 'No se pudo encontrar');
                res.redirect('/');
            }

        }).error(function () {
            req.flash('error', 'ocurrio un problema, comuniquese con los desarrolladore');
            res.redirect('/');
        });

    }
}
module.exports = (HistorialController);



