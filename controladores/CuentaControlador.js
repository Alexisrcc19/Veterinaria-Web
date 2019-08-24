
'use strict';
/**
 * Importacion de la clase de modelo Cuenta
 * @type Module cuenta|Module cuenta
 */
/**
 * 
 * @type Module cuenta|Module cuenta---sirve para extraer el modelo de la cuenta
 */
var cuentaC = require('../modelos/cuenta');
/**
 * Clase que permite iniciar sesion y cerrar sesion
 */


class CuentaController {
    /**
     * Funcion que permite iniciar sesion
     * @param {type} req objeto peticion
     * @param {type} res objeto respuesta
     * @returns {undefined} redireccion a paginas
     */

    iniciar_sesion(req, res) {

        cuentaC.getJoin({persona: {rol: true}}).filter({correo: req.body.correo}).run().then(function (verificar) {
            var cuenta = verificar[0];
            /**
             * se usa rty-catch para poder atrapar errores, en este caso es siendo usado en caso de que se digite algun tipo de 
             * cuenta o una clave que no exista en la base de datos, en cuyo caso atrapara ese error y lo represenatara como "la cuenta no existe",
             * e inmediatamente se redirige a la pagina principal  
             */
            try {
                /**
                 * 
                 * @type ver = variable declarada para poder rescatar el rol del cual se esta tratando de iniciar sesion
                 * para acontinuacion una vez reconocido el rol se le presentara en pantalla lo que tiene disponible, 
                 * ya sea veterinario o usuario
                 */
                var ver = cuenta.persona.rol.nombre;
            } catch (error) {
                req.flash('error', 'No existe la cuenta');
                res.redirect('/');
            }
            /**
             * cuentaC = se hace referencia a la cuenta para poder verificar si los datos ingresados son los correctos,
             * caso contrario aparecera otro error diciendo "los datos son incorrectos" e inmediantamente se redirige a la 
             * pagina principal
             * 
             * getJoin= se usa cuando dos cuentas estan relacionadas
             * 
             * persona = se une el modelo de persona para poder extraer el rol con el cual inicia sesion,
             * en el rol se tiene el dato "nombre" el cual es de tipo boolean, ya que solo estara enviando 
             * true o false, por temas de la plantilla usada
             * 
             * filter = se filtra el correo para la futura verificacion de la cuenta antes de dar permisos de ingreso
             * 
             * run() = esta funcion es usada para hacer funcionar, aunque no es obligatoria
             * 
             * then() = usado para realizar el collback dentro de la mascota con el modelo y el filter incluido
             */

            cuentaC.getJoin({persona: {rol: true}}).filter({correo: req.body.correo, visible:true}).run().then(function (verificar) {
               
                    
                
                /**
                 * verificar.length = se usa para poder saber si la cuenta es mayor a cero, caso contrario saldra el error de "No existe la cuenta"
                 * que en realidad es porque la base de datos no tiene registro de la cuenta pero por temas de privacidad se presentara al 
                 * usuario dicho mensaje
                 */
                if (verificar.length > 0) {
                    /**
                     * 
                     * @type verificar = se la toma como arreglo empezando desde cero ya que estamos trayendo todos los datos de la cuenta
                     */
                    var cuenta = verificar[0];
                    /**
                     * cuenta.clave = se esta extrayendo la informacion de la cuenta, en este caso se extrae la clave para luego poder comprobar
                     * con el "req.body.clave" el cual es rescatado de la plantilla "publico"
                     */
                    if (cuenta.clave === req.body.clave) {
                        /**
                         * req.session.cuenta = en esta variable de sesion estamos recuperando todos los datos que estaran activos durante todo el tiempo
                         * que se encuentre en sesion, se han puesto los datos que se crean convenientes
                         * 
                         * id = se extrae el id de la persona que haya iniciado sesion, ya sea veterinario o usuario
                         * external = se extrae el external_id de la persona que haya iniciado sesion, ya sea veterinario o usuario
                         * persona = se extrae el valor del boolean de la persona que haya iniciado sesion, ya sea veterinario o usuario
                         * usuario =me extrae los datos (nombres y apellidos) de la persona que haya iniciado sesion, ya sea veterinario o usuario
                         */
                        req.session.cuenta = {id: cuenta.persona.id, external: cuenta.persona.external_id, persona: ver,
                            usuario: cuenta.persona.apellidos + " " + cuenta.persona.nombres, ver: cuenta.correo};
                        //en caso de querer recuperar el rol de quien inicia sesion se usara lo siguiente:
                        //cuenta.veterinario.rol.nombre
                        res.redirect('/');
                    } else {
                        req.flash('error', 'Los datos son incorrectos');
                        res.redirect('/');
                    }
                } else {
                    req.flash('error', 'No existe la cuenta');
                    res.redirect('/');
                }
                /**
                 * 
                 * @param {type} error = saldra error en caso de no estar conectada correctamente la base de datos, y por ende no encontraria 
                 * los datos del modelo llamado persona
                 * @returns {undefined}
                 */
            }).error(function (error) {
                req.flash('error', 'Algo salio mal, comuniquese con los desarroladores');
                res.redirect('/');
            });
            /**
             * 
             * @param {type} error = saldra error en caso de no estar conectada correctamente la base de datos, y por ende no encontraria 
             * los datos del modelo llamado persona
             * @returns {undefined}
             */
           
        }).error(function (error) {
            req.flash('error', 'Algo salio mal, comuniquese con los desarroladores');
            res.redirect('/');
        });
    }
    /**
     * 
     * @param {type} req = en este caso es usado para destruir la sesion que se encuentre activa
     * @param {type} res = usada para la redirigir a la pagina principal(publica)
     * @returns {undefined}
     * 
     */
    cerrar_sesion(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}
/**
 * exportacion de la clase "CuentaController"
 */

module.exports = (CuentaController);


