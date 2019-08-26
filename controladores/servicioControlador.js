
'use strict';
var servicio = require('../modelos/servicio');
var mascota = require('../modelos/mascota');
var cita = require('../modelos/cita');
/**
 * @description ServicioControl
 */
class ServicioControl {
    /**
     * @description método que permite visualizar registro del servicio
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    verRegistroServicio(req, res) {
        res.render('index', {
            title: 'Registrar Servicio',
            fragmento: 'servicio/registro',
            ventanas: "ventanas",
            msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
        });
    }
    /**
    * @description método que permite listar los servicios
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    verListadoServicio(req, res) {
        servicio.filter({ visible: true }).then(function (data) {
            res.render('index', {
                title: 'Listados de Servicios',
                fragmento: 'servicio/tablaServicio',
                ventanas: "ventanas",
                lista: data,
                msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
            });
        }).error(function (error) {

        });
    }
    /**
    * @description método que permite guardar el registro de unservicio desde veterinario
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    guardarServicio(req, res) {
        var datosServicio = {
            visible: true,
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
    * @description método que permite cargar datos del servicio para previo actualizacion
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    cargardatosServicio(req, res) {
        var external = req.query.external;
        servicio.filter({ id: external, visible: true }).then(function (resultS) {
            var servicio = resultS[0];
            res.json(servicio);
        }).error(function (error) {

        });
    }
    /**
    * @description método que permite actualizar el servicio desde veterianario
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    modificarServicio(req, res) {
        servicio.filter({ id: req.body.externalS, visible: true }).then(function (resultS) {
            if (resultS.length > 0) {
                var servicio = resultS[0];
                servicio.formaPago = req.body.tipoPagoS;
                servicio.nombre = req.body.nombreS;
                servicio.valor = req.body.costoS;
                servicio.save().then(function (modificadoS) {
                    req.flash('success', 'Servicio modificado');
                    res.redirect('/veterinario/servicio/listaServicio');
                }).error(function (error) {
                    req.flash('error', 'Error al modificar el servicio');
                    res.redirect('/veterinario/servicio/listaServicio');
                });
            }
        });
    }
 /**
     * @description método que permite cargar los datos del servicio en la vista del cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    CargarServicios(req, res) {
        servicio.filter({ visible: true }).then(function (resultS) {
            res.json(resultS);
        }).error(function () {
            console.log("ERROR AL CONSULTAR SERVICIO");
        });
    }
}

module.exports = ServicioControl;