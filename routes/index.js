var express = require('express');
var router = express.Router();
var hbs = require('handlebars');
var bd = require('../modelos/rol');





var veterinarioControl = require('../controladores/veterinarioControlador');
var veterinario = new veterinarioControl();
var cuentaControlador = require('../controladores/CuentaControlador');
var cuenta = new cuentaControlador();

var utilidades = require('../controladores/utilidades');


var iniciosesioncontrolador = require('../controladores/PublicoControlador');
var inicio = new iniciosesioncontrolador();

/* GET home page. */
function verificar_inicio(req) {
    return (req.session !== undefined && req.session.cuenta !== undefined);
}
var sacar = function (req, res, next) {
    if (verificar_inicio(req)) {
        next();
    } else {
        req.flash('error', 'Debes iniciar sesion primero!');
        res.redirect('/');
    }
};
//principal: 'principal', 
router.get('/', function (req, res, next) {
    utilidades.creacionRoles();
    if (req.session !== undefined && req.session.cuenta !== undefined) {
        res.render('index', {title: "Veterinaria", sesion: true, usuario: req.session.cuenta.usuario,
            msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    } else {
        res.render('Publico', {title: 'Veterinaria', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

    }
});

router.get('/miCuenta', function (req, res, next) {
    res.render('inicioSesionVeterinario',{title: 'Veterinaria', inicio:'inicio', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});

//router.get('/miCuenta', inicio.cuenta_veterinario);

//Veterinario
router.post('/registroVeterinario', veterinario.guardar);
//inicio de sesion
router.post('/inicio_sesion', cuenta.iniciar_sesion);
router.get('/cerrar_sesion', sacar, cuenta.cerrar_sesion);
module.exports = router;
