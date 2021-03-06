'use strict';
var mascota = require('../modelos/mascota');
var historial = require('../modelos/historial');
var persona = require('../modelos/persona');
var rol = require('../modelos/rol');
/**
 * @description HistorialController
 */
class HistorialController {
    /**
     * @description método quue nos permite listar todos los historiales con su mascota y su respectivo dueño
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    listaHistorialMascotas(req, res) {
        rol.filter({ nombre: false }).then(function (listado) {
            var rol = listado[0];
            var ver = rol.id;
            mascota.getJoin({ persona: true }).filter({ visible: true }).then(function (lista) {
                res.render('index', {
                    title: 'Historial', fragmento: 'veterinario/mascota/historial/listaHistorialMascotas', lista: lista, ventanas: "ventanas",
                    msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
                });
                console.log(lista)
            });
        });
    }
    /**
     * @description método que nos permite listar el historial de una mascota
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    verHistorial(req, res) {
        var masc = req.params.external;
        var externalPersona = req.params.external_idP;
        mascota.getJoin({ historial: true }).filter({ external_id: masc, visible: true }).then(function (lista) {
            var ver = lista[0];
            var id = ver.id;
            historial.filter({ id_mascota: id, visible: true }).then(function (listado) {
                res.render('index', {
                    title: 'Historial',
                    fragmento: 'veterinario/mascota/historial/listaHistorial',
                    listado: listado,
                    lista: lista,
                    external_idPer: externalPersona,
                    ventanas: "ventanas",
                    msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
                });
            });
        });
    }
/**
     * @description método que nos permite cargar los datos del historial en el modal para  previo actualizacion
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    cargardatosHistorial(req, res) {
        var external = req.query.external;
        historial.filter({ external_id: external, visible: true }).then(function (resultPM) {
            var his = resultPM[0];
            res.json(his);
        }).error(function (error) {
        });
    }
    /**
     * @description método que nos permite guardar el historial de una mascota
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    guardarHistorial(req, res) {
        var external = req.body.externalMasc;
        var external2 = req.body.externalCli;
        mascota.filter({ external_id: external, visible: true }).then(function (datosM) {
            var masc = datosM[0];
            var data = {
                visible: true,
                enfermedades: req.body.enfermedades,
                estado: req.body.estado,
                causa: req.body.causa,
                tratamiento: req.body.tratamiento,
                id_mascota: masc.id
            };
            var HistorialD = new historial(data);
            HistorialD.save().then(function () {
                req.flash('info', 'Historial registrado corectamente');
                res.redirect('/listaHistorialMascotas');
            }).error(function () {
                req.flash('error', 'No se pudo guardar el historial');
                res.redirect('/');
            });
        }).error(function (error) {
            res.filter('error', 'mascota registrado con exito');
            res.redirect('/listaHistorialMascotas');
        });
    }
    /**
     * @description método que permite actualizar los datos de un historial
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    modificarH(req, res) {
        var external = req.body.externalHistorialH;
        historial.filter({ external_id: external, visible: true }).then(function (data) {
            if (data.length > 0) {
                var Historial = data[0];
                Historial.causa = req.body.causaH;
                Historial.estado = req.body.estadoH;
                Historial.enfermedades = req.body.enfermedadesH;
                Historial.tratamiento = req.body.tratamientoH;
                Historial.save().then(function () {
                    req.flash('info', 'histotial modificada con exito');
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



