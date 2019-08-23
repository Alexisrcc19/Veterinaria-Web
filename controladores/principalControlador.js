'use strict';
var utilidades = require('../controladores/utilidades');
var comentarios = require('../modelos/comentarios');

class principalControlador {
    verPrincipal(req, res) {
        /*
    * creacionRoles() = permite generar por primera vez los roles
    */
        utilidades.creacionRoles();
        /*
         * creacionVeterinario() = permite generar por primera vez el veterinario
         */
        utilidades.creacionVeterinario();
        /*
         * verifica si existe una sesion activa, caso contrario se encontrara en el principal(publico)
         */
        if (req.session !== undefined && req.session.cuenta !== undefined) {
            var verificar = req.session.cuenta.ver;
            var restringir = true;
            if (verificar === "veterinario") {
                restringir = true;
            } else {
                restringir = false;
            }
            comentarios.filter({ id_comentario: req.session.cuenta.external }).then(function (com) {
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



