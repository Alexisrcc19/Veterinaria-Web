'use strict';

class CitaControl {
    /**
     * 
     * @param {type} req = se usa para el envio de mensajes de error o informacion
     * @param {type} res = para la redireccion de plantilla, en este caso listado de citas
     * @returns {undefined}
     */
     verListaCitas(req, res){
        res.render('index', {title: 'Lista de Citas',fragmento:'listaCitas',ventanas:"ventanas"
            ,msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
}
/**
 * exportacion de la clas "CitaControl"
 */
module.exports = CitaControl;








