

'use strict';

var personaC = require('../modelos/persona');
var mascotaC = require('../modelos/mascota');
var rol = require('../modelos/rol');
class controladorMV {
    verReg(req, res) {
        rol.filter({nombre: false}).then(function (listado) {
            var ver = listado[0];
            var mos = ver.id;
            console.log(mos);
            personaC.getJoin({mascota: true}).filter({id_rolPersona: mos}).then(function (lista) {

                res.render('index', {
                    title: 'Veterinario',
                    fragmento: 'veterinario/cliente/listaClientes',
                    lista: lista,
                    ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}
                });
                console.log(listado)
            });

        });
    }

    visualizarModificar(req, res) {
        var external = req.params.external;
        console.log("external: " + external);
        personaC.filter({external_id: external}).then(function (resultC) {
            var cliente = resultC[0];
            console.log(cliente);
            mascotaC.filter({id_cliente: cliente.id}).then(function (resultM) {
                res.render('index', {
                    title: 'Administrar Mascota',
                    fragmento: 'veterinario/mascota/listaMascota',
                    cliente: cliente,
                    listaM: resultM,
                    ventanas: "ventanas",
                    msg: {
                        error: req.flash('error'),
                        info: req.flash('info'), ok: req.flash('success')
                    }
                })
            }).error(function (error) {
            });
        }).error(function (error) {
            req.flash('error', "Error al regsitar!");
            res.redirect("/");
        });
    }
    guardarMascota(req, res) {
        var external = req.body.externalC;
        mascotaC.then(function (historial) {
            var nroHistoria = historial.length;
            var reg = ("N-H-" + nroHistoria);
            personaC.filter({id: external}).then(function (resultC) {
                var cliente = resultC[0];
                var data = {
                    nro_historial: reg,
                    raza: req.body.raza,
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    tipo: req.body.tipo,
                    especie: req.body.especie,
                    id_cliente: cliente.id
                };
                var mascotaD = new mascotaC(data);
                mascotaD.save().then(function (guardar) {
                    req.flash('info', 'mascota registrada');
                    res.redirect('/veterinario/mascota/listaMascota/' + cliente.external_id);
                }).error(function (error) {
                    req.flash('error', 'No se pudo guardar');
                    res.redirect('/');
                });
            }).error(function (error) {
            });

        });
    }
}
module.exports = controladorMV;