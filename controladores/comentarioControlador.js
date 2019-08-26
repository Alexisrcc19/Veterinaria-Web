'use strict';
var veterinario = require('../modelos/persona');
var rol = require('../modelos/rol');
var comentario = require('../modelos/comentarios');
/**
 * @description comentarioControlador
 */

class comentarioControlador {
    /**
     * @description método que permite agregar un comentario desde el cliente
     * @param {req} req objeto peticion
     * @param {res} res objeto rspuesta
     */
    dejarComentario(req, res) {
        rol.filter({ nombre: true }).then(function (lista) {
            var ver = lista[0];
            var roles = ver.id;
            veterinario.filter({ vet: true, visible: true }).then(function (ver) {
                res.render('index',
                    {
                        title: 'Comentario',
                        fragmento: 'usuario/comentario/registroComentario',
                        listado: ver, ventanas: "ventanas",
                        msg: {
                            error: req.flash('error'),
                            info: req.flash('info'),
                            ok: req.flash('success')
                        }
                    }
                );
            });
        });
    }
    /**
     * @description método que nos permite guardar un comentario  
     * @param {req} req objeto peticion 
     * @param {res} res objeto rspuesta
     */
    guardarComentario(req, res) {
        var perso = req.session.cuenta.usuario;
        var external = req.body.veterinario;
        comentario.then(function (guardar) {
            var data = {
                visible: true,
                comentarios: req.body.comentario,
                cliente: perso,
                id_comentario: external
            };
            var comentarioC = new comentario(data);
            comentarioC.save().then(function () {
                req.flash('info', 'comentario enviado');
                res.redirect('/');
            }).error(function () {
                req.flash('error', 'No se pudo enviar comentario');
                res.redirect('/');
            });
        });
    }
}
module.exports = (comentarioControlador);


