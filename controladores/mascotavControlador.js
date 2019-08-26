'use strict';
var personaC = require('../modelos/persona');
var mascotaC = require('../modelos/mascota');
var rol = require('../modelos/rol');
/**
 * @description controladorMV
 */
class controladorMV {
    /**
     * @description método que permite visualizar registro de mascota desde cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    verReg(req, res) {
        rol.filter({ nombre: false }).then(function (listado) {
            var ver = listado[0];
            var mos = ver.id;
            console.log(mos);
            personaC.getJoin({ mascota: true }).filter({ id_rolPersona: mos, visible: true }).then(function (lista) {
                res.render('index', {
                    title: 'Veterinario',
                    fragmento: 'veterinario/cliente/listaClientes',
                    lista: lista,
                    ventanas: "ventanas",
                    msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
                });
                console.log(listado)
            });
        });
    }
    /**
     * @description método que permite cargar los datos al modal para 
     * previo actualizacion de datos de sde cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    visualizarModificar(req, res) {
        var external = req.params.external;
        console.log("external: " + external);
        personaC.filter({ external_id: external, visible: true }).then(function (resultC) {
            var cliente = resultC[0];
            console.log(cliente);
            mascotaC.filter({ id_cliente: cliente.id, visible: true }).getJoin({ persona: true }).then(function (resultM) {
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
    /**
    * @description método que permite guardar un registro de mascota desde cliente
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
    guardarMascota(req, res) {
        var external = req.body.externalC;
        mascotaC.filter({ visible: true }).then(function (historial) {
            var nroHistoria = historial.length;
            var reg = ("N-H-" + nroHistoria);
            personaC.filter({ id: external, visible: true }).then(function (resultC) {
                var cliente = resultC[0];
                var data = {
                    visible: true,
                    nro_historial: reg,
                    raza: req.body.raza,
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    sexo: req.body.sexo,
                    tipo: req.body.tipo,
                    especie: req.body.especie,
                    id_cliente: cliente.id
                };
                var mascotaD = new mascotaC(data);
                mascotaD.save().then(function (guardar) {
                    req.flash('info', 'mascota registrada con exito');
                    res.redirect('/veterinario/mascota/listaMascota/' + cliente.external_id);
                }).error(function (error) {
                    req.flash('error', 'No se pudo guardar su mascota');
                    res.redirect('/');
                });
            }).error(function (error) {
            });
        });
    }
}
module.exports = controladorMV;