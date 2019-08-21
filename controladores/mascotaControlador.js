'use strict';
/**
 * importacion del modelo mascota
 * @type Module mascota|Module mascota
 */
var mascota = require('../modelos/mascota');
var persona = require('../modelos/persona');


class MascotaControl {
    /**
     * 
     * @param {type} req = usado para recuperar el id de la persona en sesion, para el envio de mensajes
     * @param {type} res = usado para la redireccion de las plantillas, ya sea para el registro de la mascota o para la pagina principal
     * @returns {undefined}
     */
    visualizar(req, res) {
        /**
         * mascota = modelo usado para poder listar atodas la mascotas registradas por el usuario o cliente
         * 
         * getJoin = para la relacion de las tablas MASCOTA-PERSONA, en este caso es el propietario de la mascota
         * 
         * filter = usado para filtar el id_cliente, el cual es la relacion que existe enre mascota y cliente, y una vez usado
         * se listan unicamente las mascotas de dicho cliente
         * 
         * then() = usado para realizar el collback dentro de la mascota con el modelo y el filter incluido
         */
        mascota.getJoin({persona: true}).filter({id_cliente: req.session.cuenta.id}).then(function (lista) {
            var mas = false;
            /**
             * mas = variable ceada para verificar mas adelante
             */
            if (lista.length <= 0) {
                /**
                 * lista.length = usada para poder verificar si la lista esta vacia, en cuyo caso se le mostrara al cliente que aun 
                 * no tiene mascotas registradas, e lugar de salir un tabla vacia, enviandole la variable "mas" con false por termas de la plantillas "hbs"
                 */
                mas = false;
            } else {
                /**
                 * caso contrario = usado para enviar la variable "mas" con el valor de true, queriendo decir que si existen mascotas registradas,
                 * y por ende se podra visualizar el listado de dichas mascotas 
                 */
                mas = true;
            }
            res.render('index', {
                title: 'Veterinaria', fragmento: 'usuario/mascota/listadoMascota', mas: mas, lista: lista, ventanas: "ventanas",
                msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}
            });
        }).error(function (error) {
            /**
             * error = error en el cual se informa al usuario que hubo error el cual debe ser tratado por los desarrolladores,
             * ya que se trata de un error al momento de ver los datos del modelo "mascota"
             */
            req.flash('error', 'por favor comuniquese con los desarrolladores');
            res.redirect('/');
        });

    }
    /**
     * 
     * @param {type} req = usado para rescatar el id de la persona en la cual se va a relacionar la mascota, usado para tambien 
     * extraer los datos del formulario, y enviar mensajes de respuesta 
     * @param {type} res = usado para la redireccion de plantillas
     * @returns {undefined}
     */
    guardar(req, res) {
        /**
         * 
         * @type idper = variable creada para conocer el id de la persona la cual esta iniciada sesion
         */
        var idper = req.session.cuenta.id;
        /**
         * 
         * @type data = son los datos de la mascota a guardar con el id_cliente respectivo, dependiendo del usuario en sesion
         */
        mascota.then(function (historial) {
            var nroHistorial = historial.length;
            var reg = ("N-H-" + nroHistorial);

            var data = {
                nro_historial: reg,
                raza: req.body.raza,
                nombre: req.body.nombre,
                edad: req.body.edad,
                sexo: req.body.sexo,
                tipo: req.body.tipo,
                especie: req.body.especie,
                id_cliente: idper
            };
            /**
             * 
             * @type mascota = dato instanciado incluyendole la "data", la cual contiene toda la informacion de la mascota a registrar
             */
            var mascotaD = new mascota(data);
            /**
             * save() = metodo usado para guardar directametne en la base de datos
             */
            mascotaD.save().then(function () {
                req.flash('info', 'mascota registrada');
                res.redirect('/registroMascota');
            }).error(function () {
                req.flash('error', 'No se pudo guardar');
                res.redirect('/');
            });
        });
    }
    guardarDesdeVeterinario(req, res) {
        var external = req.body.externalCli;

        /**
         * 
         * @type data = son los datos de la mascota a guardar con el id_cliente respectivo, dependiendo del usuario en sesion
         */
        mascota.then(function (historial) {
            var nroHistorial = historial.length;
            var reg = ("N-H-" + nroHistorial);

            persona.filter({external_id: external}).then(function (datosM) {
                // console.log(datosM);
                var persona = datosM[0];
                var data = {
                    nro_historial: reg,
                    raza: req.body.raza,
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    sexo: req.body.sexo,
                    tipo: req.body.tipo,
                    especie: req.body.especie,
                    id_cliente: persona.id
                };
                /**
                 * 
                 * @type mascota = dato instanciado incluyendole la "data", la cual contiene toda la informacion de la mascota a registrar
                 */
                var mascotaD = new mascota(data);
                /**
                 * save() = metodo usado para guardar directametne en la base de datos
                 */
                mascotaD.save().then(function () {
                    req.flash('info', 'mascota registrada');
                    res.redirect('/registroMascota/' + external);
                }).error(function () {
                    req.flash('error', 'No se pudo guardar');
                    res.redirect('/');
                });
            }).error(function (error) {
                res.filter('error', 'mascota registrado con exito');
                res.redirect('/registroMascota/' + external);
            });
        });
    }
    /**
     * metodo para visualizar datos en la vista modificar mascota
     */
    cargardatosMascota(req, res) {
        var external = req.query.external;
        mascota.filter({external_id: external}).then(function (resultPM) {
            // res.send(resultP);
            var mascota = resultPM[0];
            res.json(mascota);
        }).error(function (error) {

        });

    }

    modificarM(req, res) {
        var externalCliente = req.body.externalCliente;
        mascota.filter({external_id: req.body.externalMa}).then(function (resultM) {
            if (resultM.length > 0) {
                var mascotaM = resultM[0];
                mascotaM.nombre = req.body.nombreMa;
                mascotaM.raza = req.body.razaMa;
                mascotaM.edad = req.body.edadMa;
                mascotaM.sexo = req.body.sexoMa;
                mascotaM.tipo = req.body.tipoMa;
                mascotaM.especie = req.body.especieMa;

                mascotaM.saveAll().then(function (actualizadoM) {
                    req.flash('info', 'actualizado corectamnete');
                    res.redirect('/registroMascota/' + externalCliente);
                }).error(function (error) {
                    // req.flash('modificado con exito');
                    req.flash('error', 'error al modificado');
                    res.redirect('/registroMascota/' + externalCliente);

                });

            }
        });

    }
}
/**
 * exportacion de la clase MascotaControl
 */
module.exports = MascotaControl;








