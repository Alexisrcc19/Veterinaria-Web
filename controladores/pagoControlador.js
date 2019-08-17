'use strict';
class PagoControl {
     verListaPagos(req, res){
        res.render('index', {title: 'Lista de Pagos',fragmento:'listaPagos',ventanas:"ventanas"
            ,msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
    verGestionPagos(req, res){
        res.render('index', {title: 'Lista de Pagos',fragmento:'GestionPagos'
            ,msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
}
module.exports = PagoControl;








