'use strict';
var comentarios = require('../modelos/comentarios');
var mascota = require('../modelos/mascota');
var historial = require('../modelos/historial');
var persona = require('../modelos/persona');
var foro = require('../modelos/foro');
/**
 * @description principalControlador
 */
class principalControlador {
    /**
     * @description método que nos permite eliminar un comentario desde el veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarComentario(req, res) {
        comentarios.filter({ external_id: req.body.borrarComentario }).then(function (resultM) {
            if (resultM.length > 0) {
                var comentarioC = resultM[0];
                comentarioC.visible = false;
                comentarioC.save().then(function (BorrarComentario) {
                    req.flash('error', 'Comentario eliminado');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'error al eliminar');
                    res.redirect('/');
                });
            }
        });
    }
    /**
     * @description método que nos permite eliminar una mascota
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarMascota(req, res) {
        mascota.filter({ external_id: req.body.borrarMascota }).then(function (resultM) {
            if (resultM.length > 0) {
                var mascotaUsuarioC = resultM[0];
                mascotaUsuarioC.visible = false;
                mascotaUsuarioC.save().then(function (BorrarComentario) {
                    req.flash('error', 'Mascota eliminada');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'error al eliminar');
                    res.redirect('/');
                });
            }
        });
    }
    /**
     * @description método que nos permite eliminar el historial de una mascota
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarHistorial(req, res) {
        historial.filter({ external_id: req.body.borrarHistorial }).then(function (resultM) {
            if (resultM.length > 0) {
                var historialC = resultM[0];
                historialC.visible = false;
                historialC.save().then(function (BorrarHistorial) {
                    req.flash('error', 'Historial eliminado');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'error al eliminar');
                    res.redirect('/');
                });
            }
        });
    }
    /**
     * @description método que nos permite eliminar un usuario desde el veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarUsuario(req, res) {
        persona.filter({ external_id: req.body.borrarUsuario, visible: true }).getJoin({ cuenta: true }).then(function (resultM1) {
            var data = resultM1[0];
            var idC = data.id;
            mascota.filter({ id_cliente: idC }).then(function (eliminarMascota) {
                if (resultM1.length > 0) {
                    var clienteM = resultM1[0];
                    clienteM.visible = false;
                    clienteM.cuenta.visible = false;
                    var mascotaUsuarioC = eliminarMascota[0];
                    mascotaUsuarioC.visible = false;
                    mascotaUsuarioC.save().then(function (BorrarComentario) {
                        req.flash('error', 'mascota eliminado');
                        res.redirect('/');
                    }).error(function (error) {
                        req.flash('error', 'error al eliminar');
                        res.redirect('/');
                    });
                    clienteM.saveAll({ cuenta: true }).then(function (modificadoM) {
                        req.flash('error', 'Cliente eliminado');
                        res.redirect('/listaclientes')
                    }).error(function (error) {
                        req.flash('error', 'error al eliminar');
                        res.redirect('/listaclientes')
                    });
                }
            });
        });
    }
    /**
     * @description método que nos permite eliminar un veterinario 
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarVeterinario(req, res) {
        persona.filter({ external_id: req.body.borrarVeterinario, visible: true }).getJoin({ cuenta: true }).then(function (resultM1) {
            if (resultM1.length > 0) {
                var clienteM = resultM1[0];
                clienteM.visible = false;
                clienteM.cuenta.visible = false;
                clienteM.saveAll({ cuenta: true }).then(function (modificadoM) {
                    req.flash('error', 'Veterinario eliminado');
                    req.session.destroy();
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'error al eliminar');
                    res.redirect('/')
                });
            }
        });
    }
    /**
     * @description método que nos permite eliminar un tema de discucion del foro
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    eliminarForo(req, res) {
        foro.filter({ external_id: req.body.borrarForo }).then(function (resultM) {
            if (resultM.length > 0) {
                var ForoV = resultM[0];
                ForoV.visible = false;
                ForoV.save().then(function (BorrarComentario) {
                    req.flash('error', 'Foro eliminado');
                    res.redirect('/foroVeterinario');
                }).error(function (error) {
                    req.flash('error', 'error al eliminar');
                    res.redirect('/foroVeterinario');
                });
            }
        });
    }
}
module.exports = (principalControlador);



