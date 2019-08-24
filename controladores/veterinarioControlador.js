'use strict';
/**
 * importacion de modelos
 * @type Module rol|Module rol
 */
var rol = require('../modelos/rol');
var persona = require('../modelos/persona');
var cuenta = require('../modelos/cuenta');
var mascota = require('../modelos/mascota');


class VeterinarioControl {
    /**
     * 
     * @param {type} req = usado para rescatar el external del veterinario en sesion
     * @param {type} res = usado para el redireccionamineto de plantillas
     * @returns {undefined}
     */
    visualizarConfiguracion(req, res) {
        /**
         * external = variable creada para reconocer el external_id del veterinario en sesion 
         */
        var external = req.params.external;
        /**
         * persona = modelo en el cual se registrara el veterinario
         * 
         * getJoin() = funcion usada para la relacion de modelos
         * 
         *  filter() = funcion usada para filtrar el external_id de la persona en sesion 
         *  
         *  then() = funcion en el cual se realiza el collback en persona 
         *  
         *  cuenta = modelo relacionado con persona
         */
        persona.getJoin({cuenta: true}).filter({external_id: external,visible:true}).then(function (data) {
            /**
             * data.length = usada para la verificacion de existencia de cuentas de veterinario
             */
            if (data.length > 0) {
                /**
                 * 
                 * @type data = leida como arreglo desde cero porque se extraen todos los datos 
                 * de la persona 
                 */
                var datos = data[0];
                /**
                 * datos: datos = se envia todos los datos contenidos en persona incluido el modelo de cuenta
                 */
                res.render('index', {title: 'Configuracion', fragmento: 'veterinario/configuracionVeterinario', datos: datos, ventanas: "ventanas",
                    msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
            } else {
                /**
                 * error = mesnsaje visualizado por el usuario en caso de que no existan veterinario registrados
                 */
                req.flash('error', 'No existen veterinario registrados');
                res.redirect('/administracion/pacientes');
            }
        }).error(function () {
            /**
             * error = en caso de que hubiese un problema interno con lo modelos
             */
            req.flash('error', 'se genero un problema por favor comuniquese con los desarrolladores');
            res.redirect('/administracion/pacientes');
        });
    }
    /**
     * 
     * @param {type} req = usado para reconocer el external de la persona en sesion, y para la recoleccion de datos
     * en el formulario
     * @param {type} res = usado para la redireccion de plantillas
     * @returns {undefined}
     */
    configuracionVeterinario(req, res) {
        /**
         * persona = modelo usado en el cual se modificara los datos del veterinario en sesion 
         * 
         * getJoin() = funcion usada para la relacion de modelos
         * 
         *  filter() = funcion usada para filtrar el external_id de la persona en sesion 
         *  
         *  then() = funcion en el cual se realiza el collback en persona 
         *  
         *  cuenta = modelo relacionado con persona
         */
        rol.filter({nombre: true}).then(function (roles) {
            var ver = roles[0];
            var role = ver;

            persona.getJoin({cuenta: true}).filter({external_id: req.body.external,visible:true}).then(function (data) {
                if (data.length > 0) {
                    var veterinario = data[0];
                    /**
                     * datos en los cuales se sobreescribiran en el modelo
                     */
                    veterinario.apellidos = req.body.apellidos;
                    veterinario.nombres = req.body.nombres;
                    veterinario.direccion = req.body.direccion;
                    veterinario.telefono = req.body.telefono;
                    veterinario.cedula = req.body.cedula;
                    veterinario.id_rolPersona = role.id;
                    /**
                     * datos incluidos los de la cuenta 
                     */
                    veterinario.cuenta.usuario = req.body.usuario;
                    veterinario.cuenta.correo = req.body.correo;
                    veterinario.cuenta.clave = req.body.claveActual;
                    /**
                     * veterinario = modelo en el cual se guardaran los datos actuales
                     * 
                     * saveAll() = funcion usada para guardar modelos relacionados
                     * 
                     * then()= funcion en la cual se realiza el collback de veterinario
                     */
                    veterinario.saveAll({cuenta: true}).then(function () {
                        /**
                         * info = mensaje de informacion al usuario indicando que se modifico el veterinario con exito
                         */

                        req.session.destroy();
                        res.redirect('/');
                    }).error(function () {
                        /**
                         * error = mensaje mostrado al usuario en caso de no poder modificar el veterinario correctamente
                         */
                        req.flash('error', 'No se pudo modificar');
                        res.redirect('/');
                    });

                } else {
                    /**
                     * error = mensaje mostrado al usuario en caso de no encontrar los datos del veterinario en sesion
                     */
                    req.flash('error', 'No se pudo encontrar');
                    res.redirect('/');
                }

            }).error(function () {
                /**
                 * error = mensaje mostrado al usuario en caso de no encontrar los datos del veterinario en sesion
                 */
                req.flash('error', 'ocurrio un problema, comuniquese con los desarrolladore');
                res.redirect('/');
            });
        });
    }
    /**
     * 
     * @param {type} req = usada para mostrar mensajes
     * @param {type} res = usada para la redireccion de plantillas
     * @returns {undefined}
     */
    registroVeterinario(req, res) {
        /**
         * registroVeterianrio = usado para redireccion a la plantilla de registro de veterinario
         */
        res.render('index', {title: 'Registrate', fragmento: 'veterinario/registroVeterinario', registro: 'registro', ventanas: "ventanas",
            msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
    /*
     * listadoPaciente = usada para que el veterinario pueda visualizar la lista de paciente registrados
     */
    listadoPacientes(req, res) {
        /**
         * mascota = modelo usado ya que un clinete es el propietario de un amascota
         * 
         * persona = modelo usado para poder ver los datos necesarios del cliente
         */
        mascota.getJoin({persona: true}).filter({visible:true}).then(function (lista) {
            /**
             * lista: lista = usada para poder enviar todos los datos existentes de persona y mascoat
             */
            res.render('index', {title: 'Veterinario', fragmento: 'registroMascotaVeterinario', lista: lista, ventanas: "ventanas",
                msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
        }).error(function () {
            /**
             * error = mensaje amostrado al usuario en caso de no poder encontrar los datos de la mascota del respectivo cliente
             */
            req.flash('error', 'No se pudo encontrar');
            res.redirect('/');
        });
    }

    verListaVeterinario(req, res) {
        res.render('index', {title: 'Lista de Veterinarios', fragmento: 'listaVeterinarios', ventanas: "ventanas"
            , msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
    }
    /*
     * guardar = usada para el registro de un nuevo veterinario 
     */
    guardar(req, res) {
        /*
         * rol = modelo usado para poder verificar el rol de un veterinario al momento de guardar
         * 
         * filter() = funcion usada para poder definir al veterinario con valor de true
         * 
         * then()= funcion en la cual se realiza el colback de rol
         */
        rol.filter({nombre: true}).run().then(function (roles) {
            /*
             * roles.length = usada para la verificacion de roles existentes
             */
            if (roles.length > 0) {
                /*
                 * roles =  leido desde cero porque se traen todos los datos existentes del modelo rol
                 */
                var role = roles[0];
                /*
                 * cuenta = modelo en el cual se guardaran los datos del nuevo veterinario 
                 * 
                 * filter() = funcion para verificar si el correo ya existe
                 * 
                 * then()= funcion en donde se realizara el collback de cuenta
                 * 
                 */
                cuenta.filter({correo: req.body.correo,visible:true}).then(function (verificarCuenta) {
                    if (verificarCuenta.length >= 1) {
                        /*
                         * error = mensaje en caso de que la cuenta ya exista
                         */
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarVeterinario');
                    } else {
                        /*
                         * datosV = datos del veterinario a registrar
                         */
                        var datosV = {
                            visible:true,
                            vet: true,
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            nro_registro: req.body.nro_registro,
                            id_rolPersona: role.id
                        };
                        /*
                         * datosC = datos de la cuenta a registrar
                         */
                        var datosC = {
                            visible:true,
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };
                        /*
                         * persona = instanciada con los datos del veterinario incluido
                         * 
                         * cuenta = instanciada con los datos de la cuenta incluida
                         * 
                         * veterinario.cuenta = relacion de los modelos para el posterior registro
                         */
                        var Veterinario = new persona(datosV);
                        var Cuenta = new cuenta(datosC);
                        Veterinario.cuenta = Cuenta;
                        /*
                         * verterinario = modelo en el cual se procede a registrar
                         * 
                         * saveAll() = funcion usada para el registro de modelos relacionados
                         * 
                         * then() = funcion en el cual se realiza el collback de veterinario
                         */
                        Veterinario.saveAll({cuenta: true}).then(function (result) {
                            /*
                             * success = mensaje en caso de que el veterinario se haya registrado correctamente
                             */
                            req.flash('success', 'Se ha registrado correctamente!');
                            req.session.destroy();
                            res.redirect('/');
                        }).error(function () {
                            /*
                             * error = mensaje mostrado en caso de que la cuenta ya exista
                             */
                            req.flash('error', 'la cuenta ya existe');
                            res.redirect('/');
                        });
                    }
                }).error(function () {
                    /*
                     * error = mensaje mostrado en caso de que la cuenta ya exista
                     */
                    req.flash('error', 'la cuenta ya existe');
                    res.redirect('/');
                });

            } else {
                /*
                 * error = mensaje mostrado en caso de que aun no hayan cargado los roles
                 */
                req.flash('error', 'Aun no existen roles, recargue la pagina');
            }
        }).error(function () {

            /*
             * error = mensaje mostrado en caso de que existan problemas con los modelos
             */
            req.flash('error', 'hubo un problema por favor comuniquese con los desarroladores');
            res.redirect('/');
        });
    }
}
/*
 * exportacion de la clase VeterinarioControl
 */
module.exports = VeterinarioControl;








