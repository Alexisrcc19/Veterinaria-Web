'use strict';
class publicoControlador{
    cuenta_veterinario(req, res){
   
    res.render('index', {title: 'Registrate', fragmento:'inicioSesionVeterinario'
    , msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

    }
}
module.exports = publicoControlador;
