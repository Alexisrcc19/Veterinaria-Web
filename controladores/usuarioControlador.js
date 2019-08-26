'use strict';
var rol = require('../modelos/rol');
var persona = require('../modelos/persona');
var cuenta = require('../modelos/cuenta');
/**
 * @description usuarioControl
 */
class usuarioControl {
    /**
    * @description método que permite registrar un nuevo cliente desde su vista
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    guardar(req, res) {
        rol.filter({ nombre: false }).run().then(function (roles) {
            if (roles.length > 0) {
                var role = roles[0];
                cuenta.filter({ correo: req.body.correo, visible: true }).then(function (verificarCuenta) {
                    if (verificarCuenta.length >= 1) {
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarUsuario');
                    } else {
                        var datosV = {
                            visible: true,
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            id_rolPersona: role.id
                        };
                        var datosC = {
                            visible: true,
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };
                        var Usuario = new persona(datosV);
                        var Cuenta = new cuenta(datosC);
                        Usuario.cuenta = Cuenta;
                        Usuario.saveAll({ cuenta: true }).then(function (result) {
                            req.flash('success', 'Se ha registrado correctamente el usuario');
                            res.redirect('/');
                        }).error(function () {
                            req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
                            res.redirect('/registrarUsuario');
                        });
                    }
                }).error(function () {
                    req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Aun no existen roles, recargue la pagina');
            }
        }).error(function () {
            req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
            res.redirect('/');
        });
    }
    /**
    * @description método que permite visualizar datos del cliente y su cuenta para previo configuracion
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    cargardatosCliente(req, res) {
        var external = req.query.external;
        persona.filter({ external_id: external, visible: true }).getJoin({ cuenta: true }).then(function (resultP) {
            var persona = resultP[0];
            res.json(persona);
        }).error(function (error) {
        });
    }
    /**
    * @description método que permite configurar cuenta del cliente desde su vista liente
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    modificarC(req, res) {
        persona.filter({ external_id: req.body.externalM, visible: true }).getJoin({ cuenta: true }).then(function (resultM1) {
            if (resultM1.length > 0) {
                var clienteM = resultM1[0];
                clienteM.cedula = req.body.cedulaM;
                clienteM.nombres = req.body.nombresM;
                clienteM.apellidos = req.body.apellidosM;
                clienteM.telefono = req.body.telefonoM;
                clienteM.direccion = req.body.direccionM;
                clienteM.cuenta.usuario = req.body.usuarioM;
                clienteM.cuenta.correo = req.body.correoM;
                clienteM.cuenta.clave = req.body.cedulaM;
                clienteM.saveAll({ cuenta: true }).then(function (modificadoM) {
                    req.flash('success', 'registro Actualizado');
                    res.redirect('/listaclientes')
                }).error(function (error) {
                    req.flash('error', 'error al Actualizar');
                    res.redirect('/listaclientes')
                });
            }
        });
    }
    /**
     * @description método que permite visualizar datos del usuario y su cuenta para previo
     * configuracion del cliente desde veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    cargardatosUsuario(req, res) {
        var external = req.query.external;
        persona.filter({ external_id: external, visible: true }).getJoin({ cuenta: true }).then(function (resultU) {
            // res.send(resultP);
            var usuario = resultU[0];
            res.json(usuario);
        }).error(function (error) {
        });

    }
    /**
    * @description método que permite configurar la cuenta del cliente desde veterinario
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    configurarUsuario(req, res) {
        persona.filter({ external_id: req.body.externalU, visible: true }).getJoin({ cuenta: true }).then(function (usuario1) {
            if (usuario1.length > 0) {
                var clienteM = usuario1[0];
                clienteM.cedula = req.body.cedulaU;
                clienteM.nombres = req.body.nombresU;
                clienteM.apellidos = req.body.apellidosU;
                clienteM.telefono = req.body.telefonoU;
                clienteM.direccion = req.body.direccionU;
                clienteM.cuenta.usuario = req.body.usuarioU;
                clienteM.cuenta.correo = req.body.correoU;
                clienteM.cuenta.clave = req.body.clavenU2;
                clienteM.saveAll({ cuenta: true }).then(function (modificadoM) {
                    req.flash('success', 'actualizado correctamente inicie session');
                    req.session.destroy();
                    res.redirect('/')
                }).error(function (error) {
                    req.flash('error', 'error al actualizar cuenta');
                    req.session.destroy();
                    res.redirect('')
                });
            }
        });
    }
}
module.exports = usuarioControl;








