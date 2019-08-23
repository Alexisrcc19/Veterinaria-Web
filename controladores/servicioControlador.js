
'use strict';
var servicio = require('../modelos/servicio');
var mascota = require('../modelos/mascota');
var cita = require('../modelos/cita');
class ServicioControl {
    /**
     * Visualizar el registro del servicio
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    verRegistroServicio(req, res) {
        res.render('index', {
            title: 'Registrar Servicio',
            fragmento: 'servicio/registro',
            ventanas: "ventanas",
            msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
    /**
     * Visualizar la tabla de Servicios
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    verListadoServicio(req, res) {
        servicio.then(function (data) {
            res.render('index', {
                title: 'Listados de Servicios',
                fragmento: 'servicio/tablaServicio',
                ventanas: "ventanas",
                lista: data,
                msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
        }).error(function (error) {

        });
    }
/**
 * Guardar Servicio
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
    guardarServicio(req, res) {
        var datosServicio = {
            nombre: req.body.nombre,
            formaPago: req.body.tipoPago,
            valor: req.body.costo
        };
        var Servicio = new servicio(datosServicio);
        Servicio.saveAll().then(function (result) {
            req.flash('success', 'Nuevo servicio guardado correctamente');
            res.redirect('/veterinario/servicio/listaServicio');
        }).error(function () {
            req.flash('error', 'Hubo un error al guardar el servicio');
            res.redirect('/veterinario/servicio/listaServicio');
        });
    }
    /**
     * Cargar los datos del servicio para modificarlo
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
    cargardatosServicio(req, res) {
        var external = req.query.external;
        servicio.filter({ id: external }).then(function (resultS) {
            var servicio = resultS[0];
            res.json(servicio);
        }).error(function (error) {

        });

    }
    /**
     * Modificar Servicio
     * @param {type} req
     * @param {type} res
     * @returns {undefined}
     */
     modificarServicio(req, res) {
        servicio.filter({ id: req.body.externalS }).then(function (resultS) {
            if (resultS.length > 0) {
                var servicio = resultS[0];
                servicio.formaPago = req.body.tipoPagoS;
                servicio.nombre = req.body.nombreS;
                servicio.valor = req.body.costoS;
              
                servicio.save().then(function (modificadoS) {
                    req.flash('success','Servicio modificado');
                    res.redirect('/veterinario/servicio/listaServicio');
                    // res.send(modificadoM);
                }).error(function (error) {
                    // req.flash('modificado con exito');
                    req.flash('error','Error al modificar el servicio');
                    res.redirect('/veterinario/servicio/listaServicio');
                   
                });

            }
        });

    }

    
}

module.exports = ServicioControl;