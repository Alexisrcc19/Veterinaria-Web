'use strict';
class CitaControl {
     verListaCitas(req, res){
        res.render('index', {title: 'Lista de Citas',fragmento:'listaCitas'
            ,msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
}
module.exports = CitaControl;








