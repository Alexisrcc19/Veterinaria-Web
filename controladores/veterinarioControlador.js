'use strict';
var rol = require('../modelos/rol');
var veterianrio = require('../modelos/Veterinario');
var cuenta = require('../modelos/cuenta');
class VeterinarioControl {
    guardar(req, res) {
        rol.filter({nombre: "veterinario"}).run().then(function (roles) {
            if (roles.length > 0) {
                var role = roles[0];
                cuenta.filter({correo: req.body.correo}).then(function (verificarCuenta) {
                    if (verificarCuenta.length >= 1) {
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarVeterinario');
                    } else {
                        var datosV = {
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            nro_registro: req.body.nro_registro,
                            id_rolVeterinario: role.id
                        };

                        var datosC = {
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };

                        var Veterinario = new veterianrio(datosV);
                        var Cuenta = new cuenta(datosC);
                        Veterinario.cuenta = Cuenta;
                        Veterinario.saveAll({cuenta: true}).then(function (result) {
                            //res.send(result);
                            req.flash('success', 'Se ha registrado correctamente!');
                            res.redirect('/');
                        }).error(function (error) {
                            req.flash('error', 'la cuenta ya existe');
                            res.redirect('/');
                            console.log(error)
                        });
                    }
                }).error(function (error) {
                    req.flash('error', 'la cuenta ya existe');
                    console.log(error)
                    res.redirect('/');
                });

            } else {
                req.flash('error', 'Aun no existen roles, recargue la pagina');
            }
        }).error(function (error) {

        });

    }
}
module.exports = VeterinarioControl;







