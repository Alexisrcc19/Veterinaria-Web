'use strict';
var models = require('../modelos');
var uuid = require('uuid');
var sequelize = require('sequelize');
class controladorMV{
    ver(req, res){
        models.mascota.findAll({include:[{models:models.cliente,as:'cliente'}]}).then(function(result){
            res.render('index',{
                title:'Veterinaria',
                fragmento:'registroMascotaVeterinario',
                msg: {error: req.flash('error'), 
                info: req.flash('info'), ok: req.flash('success')}
            })
        });
    }
    
}
module.exports = controladorMV;