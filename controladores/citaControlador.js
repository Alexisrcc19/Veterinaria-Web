'use strict';
var persona = require('../modelos/persona');
var mascota = require('../modelos/mascota');
var cita = require('../modelos/cita');
class CitaControl {
    /**
     * Visualizacion listado de las citas (Veterinario)
     * @param {type} req = se usa para el envio de mensajes de error o informacion
     * @param {type} res = para la redireccion de plantilla, en este caso listado de citas
     * @returns {undefined}
     */
    verListaCitas(req, res) {
        persona.getJoin({cita: true}).filter({visible: true}).then(function (data) {
            cita.filter({visible: true}).then(function () {
                res.render('index', {
                    title: 'Lista de Citas',
                    fragmento: 'citaMedica/veterinario/listaCitas',
                    ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
            }).error(function (error) {
            });
        });
    }
    /**
     * Visualización del Registro de cita (Cliente)
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    verRegistro(req, res) {
        var external = req.session.cuenta.external;
        
        persona.filter({external_id: external, visible: true}).then(function (data) {
             var cliente = data[0];
             var idC = cliente.id;
            mascota.filter({id_cliente:idC, visible:true}).then(function (mascota){
            if (data.length > 0) {
                var registros = true;
                    if(mascota.length > 0){
                        registros =  true;
                    }else {
                        registros = false;
                    }
                res.render('index', {
                    title: 'Agendar Cita',
                    fragmento: "citaMedica/usuario/agendarCita",
                    cliente: cliente,
                    registro:registros,
                    mascota: mascota,
                    usuario: req.session.cuenta.usuario,
                    ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}
                });
                console.log("nombre:" + mascota.nombre);
            } else {
                req.flash('info', 'No se pudo encontrar lo solicitado!');
                res.redirect('/');
            }
        }).error(function (error) {

        });
});
    }
    /**
     * Guardar cita medica
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
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
        persona.filter({external_id: external}).then(function (data) {
            if (data.length > 0) {
                var cliente = data[0];

                var datosCita = {
                    visible: true,
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    estado: valor,
                    id_mascota: req.body.mascota,
                    id_servicio: req.body.servicio,
                    id_cliente: cliente.id
                };
                var Cita = new cita(datosCita);
                Cita.saveAll().then(function (result) {

                    req.flash('success', 'Se ha agendado su cita correctamente');
                    res.redirect('/');
                }).error(function () {
                    /**
                     * error = mesaje usado en caso de existir un problema con la conexion en cuyo caso se debera comunicar con los desarrolladores
                     */
                    req.flash('error', 'Error al momento de reservar cita');
                    res.redirect('/cita/agendar');
                });
            }
        }).error(function (error) {
            req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
            res.redirect('/cita/agendar');
        });
    }

    buscarFecha(req, res) {
        var fecha = $("#fecha").val();
        console.log(fecha);
    }

}
module.exports = CitaControl;

