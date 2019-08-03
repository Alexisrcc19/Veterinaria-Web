var express = require('express');
var router = express.Router();
//var hbs = require('handlebars');
var bd = require('../modelos/rol');



var veterinarioControl = require('../controladores/veterinarioControlador');
var veterinario = new veterinarioControl();
var cuentaControlador = require('../controladores/CuentaControlador');
var cuenta = new cuentaControlador();
var mascotacontrol = require('../controladores/mascotaControlador');
var mascota = new mascotacontrol();
var usuarioControl = require('../controladores/usuarioControlador');
var usuario = new usuarioControl();
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
        res.render('index', {title: "Veterinaria", sesion: true, usuario: req.session.cuenta.usuario, persona: req.session.cuenta.persona,
            msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    } else {
        res.render('index', {title: 'Publico', msg: {error: req.flash('error'),
                info: req.flash('info'), ok: req.flash('success')},
            fragmento: 'Publico'});

    }
});
//cuenta del veterinario
router.get('/miCuenta', function (req, res, next) {
    res.render('index', {title: 'Veterinaria',fragmento:'inicioSesionVeterinario', inicio: 'inicio', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});
router.get('/registrarVeterinario', function (req, res, next) {
    res.render('index', {title: 'Registrate',fragmento:'registroVeterinario',registro:'registro', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});
//cuenta del cliente
router.get('/miCuentaC', function (req, res, next) {
    res.render('index', {title: 'Registro Usuario',fragmento:'inicioSesionUsuario' ,inicio: 'inicio', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});
router.get('/registrarUsuario', function (req, res, next) {
    res.render('index', {title: 'Registrate',fragmento:'registroUsuario',registro:'registro', msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});

//router.get('/miCuenta', inicio.cuenta_veterinario);
//mascota
router.get('/registro',  mascota.visualizar);
//Veterinario
router.post('/registroVeterinario', veterinario.guardar);
//usuario
router.post('/registroUsuario', usuario.guardar);
//inicio de sesion
router.post('/inicio_sesion', cuenta.iniciar_sesion);
router.post('/inicio_sesionUsuario', cuenta.iniciar_sesionUsuario);
router.get('/cerrar_sesion', sacar, cuenta.cerrar_sesion);
module.exports = router;
