'use strict';
/**
 * importacion de modelos
 * @type Module rol|Module rol
 */
var rol = require('../modelos/rol');
var persona = require('../modelos/persona');
var cuenta = require('../modelos/cuenta');
class usuarioControl {
    /**
     * 
     * @param {type} req = usado para recuperar el correo de la persona y envio de mensajes
     * @param {type} res = usado para la redireccion de las plantillas, ya sea para el registro del usuario o para la pagina principal
     * @returns {undefined}
     */
    guardar(req, res) {
        /**
         * rol = modelo en el cual se verificaran los datos en caso de existir, caso contrario para registrar
         * 
         * filter = usado para filtrar el "nombre", el cual en este caso se encuentra en estado false ya que se trata de usuario
         * 
         * run() = esta funcion es usada para hacer funcionar, aunque no es obligatoria
         * 
         * then() = funcion la en la cual se realiza un collback para la manupulacion del rol
         */
        rol.filter({nombre: false}).run().then(function (roles) {
            /**
             * role.length = verifica si los roles se crearon
             */
            if (roles.length > 0) {
                /**
                 * 
                 * @type role = se la toma como arreglo empezando desde cero ya que estamos trayendo todos los datos del rol
                 */
                var role = roles[0];
                /**
                 * cuenta = modelo en el cual se van a registrar los datos ingresados por el usuario para el conrecto registro
                 * 
                 * filter = usado para la comprobasion de la cuenta, el la cual se toma en cuenta para evitar la repeticion de cuentas
                 * 
                 * then() = funcion en la cual se realiza el collback de la cuenta para poder registrar
                 */
                cuenta.filter({correo: req.body.correo}).then(function (verificarCuenta) {
                    /**
                     * verificarCuenta = usada para evitar la repeticion de cuentas
                     */
                    if (verificarCuenta.length >= 1) {
                        req.flash('error', 'la cuenta ya existe');
                        res.redirect('/registrarUsuairo');
                    } else {
                        /**
                         * datosV = es en donde se almacenan todos los datos rescatados del formulario de la plantilla 
                         */
                        var datosV = {
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,
                            id_rolPersona: role.id
                        };
                        /**
                         * datosC = son los datos de la cuenta ya que al momento de registrar un usuario, se debe de registrar con una cuenta
                         * para posteriormente poder ingresar al sistema
                         */
                        var datosC = {
                            correo: req.body.correo,
                            clave: req.body.clave,
                            usuario: req.body.usuario
                        };
                        /**
                         * persona = instanciada con los datos del usuario 
                         */
                        var Usuario = new persona(datosV);
                        /**
                         * cuenta = instanciada con los datod de la cuenta
                         */
                        var Cuenta = new cuenta(datosC);
                        /**
                         * Usuario.cuenta = relacion de las tablas para poder registrar los dos modelos
                         */
                        Usuario.cuenta = Cuenta;
                        /**
                         * Usuario = modelo en el cual se guarda los datos del clietne
                         * 
                         * saveAll = funcion usada cuando se guarda modelos relacionados
                         * 
                         * cuenta=true = referencia en donde la cuenta tambien esta relacionada al momento de guardar
                         */
                        Usuario.saveAll({cuenta: true}).then(function (result) {
                            /**
                             * success = mensaje usado para dar a conocer al cliente que la cuenta fue registrada exitosametne
                             */
                            req.flash('success', 'Se ha registrado correctamente el usuario');
                            res.redirect('/');
                        }).error(function () {
                            /**
                             * error = mesaje usado en caso de existir un problema con la conexion en cuyo caso se debera comunicar con los desarrolladores
                             */
                            req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
                            res.redirect('/registrarUsuario');
                        });
                    }
                }).error(function () {
                    /**
                     * error = mesaje usado en caso de existir un problema con la conexion en cuyo caso se debera comunicar con los desarrolladores
                     */
                    req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Aun no existen roles, recargue la pagina');
            }
        }).error(function () {
            /**
             * error = mesaje usado en caso de existir un problema con la conexion en cuyo caso se debera comunicar con los desarrolladores
             */
            req.flash('error', 'ocurrio un error porfavor comuniquese con los desarrolladores');
            res.redirect('/');
        });
    }
}
/**
 * exportacion de la clase usuarioControl
 */
module.exports = usuarioControl;








