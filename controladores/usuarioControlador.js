'use strict';
var rol = require('../modelos/rol');
var usuario = require('../modelos/cliente');
var cuenta = require('../modelos/cuenta');
class VeterinarioControl {
    guardar(req, res) {
        rol.filter({nombre: "usuario"}).run().then(function (roles) {
            if (roles.length > 0) {
                var role = roles[0];
                cuenta.filter({correo: req.body.correo}).then(function (verificarCuenta) {
                    if (verificarCuenta.length >= 1) {
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarUsuairo');
                    } else {
                        var datosV = {
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            id_rolUsuario: role.id
                        };

                        var datosC = {
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };

                        var Usuario = new usuario(datosV);
                        var Cuenta = new cuenta(datosC);
                        Usuario.cuenta = Cuenta;
                        Usuario.saveAll({cuenta: true}).then(function (result) {
                            //res.send(result);
                            req.flash('success', 'Se ha registrado correctamente el usuario');
                            res.redirect('/');
                        }).error(function (error) {
                            req.flash('error', 'algo salio mal');
                            res.redirect('/registrarUsuario');
                            console.log(error)
                        });
                    }
                }).error(function (error) {
                    req.flash('error', 'algo salio mal');
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








