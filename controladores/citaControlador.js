'use strict';
var persona = require('../modelos/persona');
var mascota = require('../modelos/mascota');
var cita = require('../modelos/cita');
/**
 * @description citaControl
 */

class CitaControl {
    /**
     * @description Método para visualizar el listado de las citas (Veterinario)
     * @param {req} req  se usa para el envio de mensajes de error o informacion
     * @param {res} res  para la redireccion de plantilla, en este caso listado de citas
     */
    verListaCitas(req, res) {
        persona.getJoin({ cita: true }, { mascota: true }).filter({ visible: true }).then(function (data) {
            cita.filter({ visible: true }).then(function (cita) {
                res.render('index', {
                    title: 'Lista de Citas',
                    fragmento: 'citaMedica/veterinario/listaCitas',
                    cita: cita,
                    ventanas: "ventanas",
                    msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
                });
            }).error(function (error) {
            });
        });
    }
    /**
     * @description Método para visualizar el registro de cliente
     * @param {req} req objeto petición 
     * @param {res} res objeto respuesta
     * @returns {undefined}
     */
    verRegistro(req, res) {
        var external = req.session.cuenta.external;
        persona.filter({ external_id: external, visible: true }).then(function (data) {
            var cliente = data[0];
            var idC = cliente.id;
            mascota.filter({ id_cliente: idC, visible: true }).then(function (mascota) {
                cita.then(function (citasReservadas) {
                    var citasR = citasReservadas[0];
                    console.log(citasReservadas)
                    if (data.length > 0) {
                        var registros = true;
                        if (mascota.length > 0) {
                            registros = true;
                        } else {
                            registros = false;
                        }
                        res.render('index', {
                            title: 'Agendar Cita',
                            fragmento: "citaMedica/usuario/agendarCita",
                            cliente: cliente,
                            citas: citasReservadas,
                            registro: registros,
                            mascota: mascota,
                            usuario: req.session.cuenta.usuario,
                            ventanas: "ventanas",
                            msg: {
                                error: req.flash('error'),
                                info: req.flash('info'),
                                ok: req.flash('success')
                            }
                        });
                        console.log(citasR.hora)
                        console.log("nombre:" + mascota.nombre);
                    } else {
                        req.flash('info', 'No se pudo encontrar lo solicitado!');
                        res.redirect('/');
                    }
                }).error(function (error) {

                });
            })
        });
    }
    /**
     * @description Método que utilizamos para guardar una cita desde cliente.
     * @param {res} res nos sirve para mostrar mensajes de error o confirmación
     */
    guardarCita(req, res) {
        var val = req.body.valor;
        var valor = false;
        if (val === "true") {
            valor = true;
        } else if (val === "false") {
            valor = false;
        }
        var external = req.session.cuenta.external;
        persona.filter({ external_id: external }).then(function (data) {
            if (data.length > 0) {
                var cliente = data[0];
                var nombre = cliente.nombres + " " + cliente.apellidos
                var datosCita = {
                    visible: true,
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    estado: valor,
                    id_mascota: req.body.mascota,
                    id_servicio: req.body.servicio,
                    id_cliente: nombre
                };
                var Cita = new cita(datosCita);
                Cita.saveAll().then(function (result) {
                    req.flash('success', 'Su cita se agendado correctamente');
                    res.redirect('/');
                }).error(function () {
                    req.flash('error', 'Error al momento de agendar su cita');
                    res.redirect('/cita/agendar');
                });
            }
        }).error(function (error) {
            req.flash('error', 'ocurrio un error por favor comuniquese con los desarrolladores');
            res.redirect('/cita/agendar');
        });
    }
}
module.exports = CitaControl;
