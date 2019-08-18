function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9)
                    aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    }
}
function creacionRoles() {
    /**
     * importacion del modelo rol
     * @type Module rol|Module rol
     */
    var rol = require('../modelos/rol');
    /**
     * rol = modelo usado para el almacenamiento de roles
     * 
     * then() = funcion en la cual se realiza un collbackpara poder almacenar los datos
     */
    rol.run().then(function (roles) {
        /**
         * roles.length = permite saber si los roles ya existen, caso contrario pasa a crearlos
         */
        if (roles.length <= 0) {
            /**
             * save() = funcion para gaurdar los roles
             * 
             * true = para el caso de ser un veterinario
             * 
             * false = para el caso de ser un cliente
             */
            rol.save([{nombre: true}, {nombre: false}]);
        }
    }).error(function (error) {
        /**
         * 
         * @type error = mensaje enviado por consaola en caso de ocurrir un error interno
         */
        console.log(error);
    });
}
function creacionVeterinario() {
    /**
     * importacion de modelos
     * @type Module persona|Module persona
     */
    var veterinarioC = require('../modelos/persona');
    var cuenta = require('../modelos/cuenta');
    var rol = require('../modelos/rol');
    /**
     * veterinarioC = modelo en el cual se generara un veterinario por defecto al momento de levantar la pagina web
     * 
     * then()= funcion en la cual se realiza una collback para poder registrar dentro del mismo los datos de veterinario que se 
     * genera por defecto 
     */
    veterinarioC.run().then(function (veterinario) {
        /*
         * veterinario.length = permite verificar si el veterinario predeterminado ya existe, caso contrario para a crearlo
         */
        if (veterinario.length <= 0) {
            /**
             * rol = modelo usado para poder cargar los datos que existen el mismo
             * 
             * filter = usado para filtar el "nombre" el cual se encuentra en estado true ya que se trata del registro de un 
             * veterinario
             * 
             * then() = funcion en el cual se realiza el collback para posteriormente registrar el veterinario mencionado
             */
            rol.filter({nombre: true}).run().then(function (roles) {
                /**
                 * roles.length = permite verificar si los roles ya han sido creados, caso contrario pasa a crearlos
                 */
                if (roles.length > 0) {
                    var role = roles[0];
                    /**
                     * datosV = son todos los datos que se le enviaran al momento de crear el veterinario que se generara por defecto
                     */
                    var datosV = {
                        cedula: "veterinario",
                        apellidos: "veterinario",
                        nombres: "veterinario",
                        direccion: "veterinario",
                        telefono: "veterinario",
                        id_rolPersona: role.id
                    };
                    /**
                     * datosC = son los datos de la cuanta de dicho veterinario 
                     */
                    var datosC = {
                        correo: "veterinario",
                        clave: "veterinario",
                        usuario: "veterinario"
                    };
                    /**
                     * 
                     * @type veterinarioC = instanciado con los datos del veterinario incluidos
                     */
                    var Veterinario = new veterinarioC(datosV);
                    /**
                     * 
                     * @type cuenta instanciada con los datos de la cuenta del veterinario incluidos
                     */
                    var Cuenta = new cuenta(datosC);
                    /**
                     * relacion de los modelos Veterinario y cuenta
                     */
                    Veterinario.cuenta = Cuenta;
                    /**
                     * saveAll() = funcion usada para el registro de modelos relacionados
                     * 
                     * cuenta: true = usada para incluir el modelo de la cuneta en la cual sera almacenada la informacion 
                     * complementaria del veterinario
                     */
                    Veterinario.saveAll({cuenta: true}).then();
                } else {
                    /**
                     * 
                     * @param {type} error = mensaje mostrado en caso de que aun no esten cargados los roles
                     * @returns {undefined}
                     */
                }
            }).error(function (error) {
                /**
                 * error = mesaje indicando un error interno del sistema
                 */
                console.log(error)
            });
        }
    }).error(function (error) {
        /**
         * error = mesaje indicando un error interno del sistema
         */
        console.log(error);
    });


}


function manejoMensajes(msg) {
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += msg;
    mensaje += '</div>';
    $("#error").html(mensaje);
}
/**
 * exportacion de las clases "creacionRoles" y "creacionVeterinario"
 */
module.exports = {creacionRoles, creacionVeterinario};