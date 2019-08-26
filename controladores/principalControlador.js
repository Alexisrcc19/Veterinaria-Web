'use strict';
var utilidades = require('../controladores/utilidades');
var comentarios = require('../modelos/comentarios');
/**
 * @description principalControlador
 */
class principalControlador {
     /**
     * @description método que permite validar la autenticacion de la persona
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    verPrincipal(req, res) {
        utilidades.creacionRoles();
        utilidades.creacionVeterinario();
        if (req.session !== undefined && req.session.cuenta !== undefined) {
            var verificar = req.session.cuenta.ver;
            var restringir = true;
            if (verificar === "veterinario") {
                restringir = true;
            } else {
                restringir = false;
            }
            comentarios.filter({ id_comentario: req.session.cuenta.external, visible: true }).then(function (com) {
                var num = com.length;
                var verificarCom = true;
                if (num > 0) {
                    verificarCom = true;
                } else {
                    verificarCom = false;
                }
                res.render('index', {
                    title: "Veterinaria", verificar: verificarCom, fragmento: 'principal', sesion: true, restringir: restringir, comentar: com, id: req.session.cuenta.id, external: req.session.cuenta.external, usuario: req.session.cuenta.usuario, persona: req.session.cuenta.persona,
                    msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
                });
                console.log(com);
            });
        } else {
            res.render('index', {
                title: 'Publico', msg: {
                    error: req.flash('error'),
                    info: req.flash('info'), ok: req.flash('success')
                },
                fragmento: 'Publico'
            });

        }
    }
}
module.exports = (principalControlador);



