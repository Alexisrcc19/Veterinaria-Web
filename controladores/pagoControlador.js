'use strict';
var servicio = require('../modelos/servicio');
var pago = require('../modelos/pago');
var persona = require('../modelos/persona');
class PagoControl {
    guardar(req, res) {
        console.log("que mas ")
        var external = req.session.cuenta.external;
        persona.filter({external_id: external, visible: true}).then(function (data) {
            var cliente = data[0];
            var idC = cliente.id;
            var val = req.params.valor;
            servicio.filter({nombre: val, formaPago:"online"}).then(function (service) {
                var s = service[0];
                var datosPago = {
                    visible: true,
                    tipo: "online",
                    fecha: req.body.fecha,
                    hora: req.body.hora,
                    id_cliente: idC,
                    valor: s.valor
                };
                var Pago = new pago(datosPago);
                Pago.save().then(function (result) {
                    req.flash('success', 'Se realizo el pago con exito correctamente');
                    res.redirect('/');
                console.log(result)
                }).error(function () {
                    req.flash('error', 'Hubo un error al pagar el servicio');
                    res.redirect('/');
                });
            }).error(function (err) {
console.log(err)
            });
        });

    }
}
module.exports = PagoControl;








