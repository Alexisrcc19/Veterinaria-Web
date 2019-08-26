'use strict';
var mascota = require('../modelos/mascota');
var persona = require('../modelos/persona');
/**
 * @description MascotaControl
 */
class MascotaControl {
    /**
         * @description método que permite visualizar la mascota registrada desde el cliente
         * @param {req} req objeto petición
         * @param {res} res objeto respuesta 
         */
    visualizar(req, res) {
        mascota.getJoin({ persona: true }).filter({ id_cliente: req.session.cuenta.id, visible: true }).then(function (lista) {
            var mas = false;
            if (lista.length <= 0) {
                mas = false;
            } else {
                mas = true;
            }
            res.render('index', {
                title: 'Veterinaria', fragmento: 'usuario/mascota/listadoMascota', mas: mas, lista: lista, ventanas: "ventanas",
                msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
            });
        }).error(function (error) {
            req.flash('error', 'por favor comuniquese con los desarrolladores');
            res.redirect('/');
        });
    }
    /**
     * @description método que permite gurdar mascota desde cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    guardar(req, res) {
        var idper = req.session.cuenta.id;
        mascota.then(function (historial) {
            var nroHistorial = historial.length;
            var reg = ("N-H-" + nroHistorial);
            var data = {
                visible: true,
                nro_historial: reg,
                raza: req.body.raza,
                nombre: req.body.nombre,
                edad: req.body.edad,
                sexo: req.body.sexo,
                tipo: req.body.tipo,
                especie: req.body.especie,
                id_cliente: idper
            };
            var mascotaD = new mascota(data);
            mascotaD.save().then(function () {
                req.flash('info', 'Mascota registrada exitosamente');
                res.redirect('/registroMascota');
            }).error(function () {
                req.flash('error', 'No se pudo resgistrar la mascota');
                res.redirect('/registroMascota');
            });
        });
    }
    /**
     * @description método que permite guardar mascota desde el veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
    guardarDesdeVeterinario(req, res) {
        var external = req.body.externalCli;
        mascota.then(function (historial) {
            var nroHistorial = historial.length;
            var reg = ("N-H-" + nroHistorial);
            persona.filter({ external_id: external, visible: true }).then(function (datosM) {
                var persona = datosM[0];
                var data = {
                    visible: true,
                    nro_historial: reg,
                    raza: req.body.raza,
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    sexo: req.body.sexo,
                    tipo: req.body.tipo,
                    especie: req.body.especie,
                    id_cliente: persona.id
                };
                var mascotaD = new mascota(data);
                mascotaD.save().then(function () {
                    req.flash('info', 'mascota registrada con exito');
                    res.redirect('/registroMascota/' + external);
                }).error(function () {
                    req.flash('error', 'No se pudo guardar mascota');
                    res.redirect('/');
                });
            }).error(function (error) {
                res.filter('error', 'mascota registrado con exito');
                res.redirect('/registroMascota/' + external);
            });
        });
    }
    /**
      * @description método que permite visualizar la mascota 
      * desde veterinario para previo actualizaciondesde veterinario
      * @param {req} req objeto petición
      * @param {res} res objeto respuesta 
      */
    cargardatosMascota(req, res) {
        var external = req.query.external;
        mascota.filter({ external_id: external, visible: true }).then(function (resultPM) {
            var mascota = resultPM[0];
            res.json(mascota);
        }).error(function (error) {
        });
    }
    /**
         * @description método quepermite actualizar datos de la mascota desde la vista del veterinario
         * @param {req} req objeto petición
         * @param {res} res objeto respuesta 
         */
    modificarM(req, res) {
        mascota.filter({ external_id: req.body.externalMa, visible: true }).then(function (resultM) {
            if (resultM.length > 0) {
                var mascotaM = resultM[0];
                mascotaM.nombre = req.body.nombreMa;
                mascotaM.raza = req.body.razaMa;
                mascotaM.edad = req.body.edadMa;
                mascotaM.sexo = req.body.sexoMa;
                mascotaM.tipo = req.body.tipoMa;
                mascotaM.especie = req.body.especieMa;

                mascotaM.saveAll().then(function (actualizadoM) {
                    req.flash('info', 'mascota actualizado corectamnete');
                    res.redirect('/');
                }).error(function (error) {
                    req.flash('error', 'error al actualizar la mascota');
                    res.redirect('/');
                });
            }
        });
    }
}
module.exports = MascotaControl;








