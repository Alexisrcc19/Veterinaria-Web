
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

        cuentaC.getJoin({ veterinario: {rol: true}}).filter({correo: req.body.correo}).run().then(function (verificar) {
                if (verificar.length > 0) {

                var cuenta = verificar[0];
                if (cuenta.clave === req.body.clave) {
                    req.session.cuenta = {external: cuenta.veterinario.external_id,persona:true,
                        usuario: cuenta.veterinario.apellidos + " " + cuenta.veterinario.nombres + " (" + cuenta.veterinario.rol.nombre + ")"};
                    res.redirect('/');
                    console.log(verificar);
                } else {
                    req.flash('error', 'Sus credenciales no son las correctas');
                    res.redirect('/');
                    console.log(verificar);
                }
            } else {
                req.flash('error', 'Sus credenciales no son las correctas');
                res.redirect('/');
                console.log(verificar);
            }
            



           

        }).error(function (error) {
            console.log(error);
        });
    }
     iniciar_sesionUsuario(req, res) {

        cuentaC.getJoin({ cliente: {rol: true}}).filter({correo: req.body.correo}).run().then(function (verificar) {
           
                if (verificar.length > 0) {

                var cuenta = verificar[0];
                if (cuenta.clave === req.body.clave) {
                    req.session.cuenta = {external: cuenta.cliente.external_id,persona:false,
                        usuario: cuenta.cliente.apellidos + " " + cuenta.cliente.nombres + " (" + cuenta.cliente.rol.nombre + ")"};
                    res.redirect('/');
                    console.log(verificar);
                } else {
                    req.flash('error', 'Sus credenciales no son las correctas');
                    res.redirect('/');
                    console.log(verificar);
                }
            } else {
                req.flash('error', 'Sus credenciales no son las correctas');
                res.redirect('/');
                console.log(verificar);
            }

        }).error(function (error) {
            console.log(error);
        });
    }

    cerrar_sesion(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = (CuentaController);


