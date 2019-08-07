
'use strict';
/**
 * I mportacion de la clase de modelo Cuenta
 * @type Module cuenta|Module cuenta
 */
var cuentaC = require('../modelos/cuenta');
/**
 * Clase que permite iniciar sesion y cerrar sesion
 */


class CuentaController {
    /**
     * Funcion que permite iniciar sesion
     * @param {type} req objeto peticion
     * @param {type} res objeto respuesta
     * @returns {undefined} redireccion a paginas
     */

    iniciar_sesion(req, res) {
        var ver = req.body.persona;
        if (ver === "veterinario") {
            cuentaC.getJoin({veterinario: {rol: true}}).filter({correo: req.body.correo}).run().then(function (verificar) {
                if (verificar.length > 0) {
                    var cuenta = verificar[0];
                    if (cuenta.clave === req.body.clave) {
                        try {
                            req.session.cuenta = {external: cuenta.veterinario.external_id, persona: true,
                                usuario: cuenta.veterinario.apellidos + " " + cuenta.veterinario.nombres + " (" + cuenta.veterinario.rol.nombre + ")"};
                            res.redirect('/');
                        } catch (error) {
                            req.flash('error', 'Los datos no son de un veterinario');
                            res.redirect('/miCuenta');
                        }
                    } else {
                        req.flash('error', 'Los datos son incorrectos');
                        res.redirect('/miCuenta');
                    }
                } else {
                    req.flash('error', 'No existe la cuenta');
                    res.redirect('/miCuenta');
                }
            }).error(function (error) {
                req.flash('error', 'Algo salio mal, comuniquese con los desarroladores');
                res.redirect('/miCuenta');
            });
        } else if (ver === "usuario") {
            cuentaC.getJoin({cliente: {rol: true}, veterinario: {rol: true}}).filter({correo: req.body.correo}).run().then(function (verificar) {
                if (verificar.length > 0) {
                    var cuenta = verificar[0];
                    if (cuenta.clave === req.body.clave) {
                        try {
                            req.session.cuenta = {external: cuenta.cliente.external_id, persona: false,
                                usuario: cuenta.cliente.apellidos + " " + cuenta.cliente.nombres + " (" + cuenta.cliente.rol.nombre + ")"};
                            res.redirect('/');
                        } catch (error) {
                            req.flash('error', 'los datos no son de un cliente');
                            res.redirect('/miCuenta');
                        }
                    } else {
                        req.flash('error', 'Los datos son incorrectos');
                        res.redirect('/miCuenta');
                    }
                } else {
                    req.flash('error', 'La cuenta no existe');
                    res.redirect('/miCuenta');
                }
            }).error(function (error) {
                req.flash('error', 'Algo salio mal, comuniquese con los desarroladores');
                res.redirect('/');
            });
        } 
    }
    cerrar_sesion(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = (CuentaController);


