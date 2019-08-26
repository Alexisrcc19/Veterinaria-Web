'use strict';
var rol = require('../modelos/rol');
var persona = require('../modelos/persona');
var cuenta = require('../modelos/cuenta');
var mascota = require('../modelos/mascota');
/**
 * @description VeterinarioControl
 */
class VeterinarioControl {
    /**
     * @description método que permite redirecionar a la pantalla para registar un veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    registroVeterinario(req, res) {
        res.render('index', {
            title: 'Registrate', fragmento: 'veterinario/registroVeterinario', registro: 'registro', ventanas: "ventanas",
            msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
        });
    }
    listadoPacientes(req, res) {
        mascota.getJoin({ persona: true }).filter({ visible: true }).then(function (lista) {
            res.render('index', {
                title: 'Veterinario', fragmento: 'registroMascotaVeterinario', lista: lista, ventanas: "ventanas",
                msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
            });
        }).error(function () {
            req.flash('error', 'No se pudo encontrar');
            res.redirect('/');
        });
    }
    /**
      * @description método que permite registrar un vterinario desde administrador
      * @param {req} req objeto petición
      * @param {res} res objeto respuesta 
      */
    guardar(req, res) {
        rol.filter({ nombre: true }).run().then(function (roles) {
            if (roles.length > 0) {
                var role = roles[0];
                cuenta.filter({ correo: req.body.correo, visible: true }).then(function (verificarCuenta) {
                    if (verificarCuenta.length >= 1) {
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarVeterinario');
                    } else {
                        var datosV = {
                            visible: true,
                            vet: true,
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            nro_registro: req.body.nro_registro,
                            id_rolPersona: role.id
                        };
                        var datosC = {
                            visible: true,
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };
                        var Veterinario = new persona(datosV);
                        var Cuenta = new cuenta(datosC);
                        Veterinario.cuenta = Cuenta;
                        Veterinario.saveAll({ cuenta: true }).then(function (result) {
                            req.flash('success', 'Se ha registrado correctamente! inicie session');
                            req.session.destroy();
                            res.redirect('/');
                        }).error(function () {
                            req.flash('error', 'la cuenta ya existe');
                            res.redirect('/');
                        });
                    }
                }).error(function () {
                    req.flash('error', 'la cuenta ya existe');
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Aun no existen roles, recargue la pagina');
            }
        }).error(function () {
            req.flash('error', 'hubo un problema por favor comuniquese con los desarroladores');
            res.redirect('/');
        });
    }
}
module.exports = VeterinarioControl;








