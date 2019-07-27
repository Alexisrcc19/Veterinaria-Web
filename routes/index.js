var express = require('express');
var router = express.Router();
var hbs = require('handlebars');
var bd = require('../modelos/rol');

var veterinarioControl = require('../controladores/veterinarioControlador');
var veterinario = new veterinarioControl();

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
router.get('/', function (req, res, next) {
    if (req.session !== undefined && req.session.cuenta !== undefined ) {
        res.render('index', {title: "Veterinaria",principal:'principal',  sesion: true, msg: {error: req.flash('error'),info: req.flash('info'), ok: req.flash('success')}});
    } else {
        res.render('index', {title: 'Medicos',inicio:'inicio', msg: {error: req.flash('error'),info: req.flash('info'), ok: req.flash('success')}});
    }
});
router.get('/registrarVeterinario', function(req, res, next) {
  res.render('index', { title: 'Registrate', registrarVeterinario: 'registrarVeterinario' });
});

router.post('/registroVeterinario',veterinario.guardar );

module.exports = router;
