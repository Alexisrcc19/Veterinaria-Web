/**
    * @description método que permite crear roles como cliente o veterinario
    * @param {req} req objeto petición
    * @param {res} res objeto respuesta 
    */
function creacionRoles() {
    var rol = require('../modelos/rol');
    rol.run().then(function (roles) {
        if (roles.length <= 0) {
            rol.save([{ nombre: true }, { nombre: false }]);
        }
    }).error(function (error) {
        console.log(error);
    });
}
 /**
     * @description método que permite crear un administrador general con datos propios
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
function creacionVeterinario() {
    var veterinarioC = require('../modelos/persona');
    var cuenta = require('../modelos/cuenta');
    var rol = require('../modelos/rol');
    veterinarioC.run().then(function (veterinario) {
        var ver = veterinario[0];
        if (veterinario.length <= 0) {
            rol.filter({ nombre: true }).run().then(function (roles) {
                if (roles.length > 0) {
                    var role = roles[0];
                    var datosV = {
                        visible: true,
                        cedula: "veterinario",
                        apellidos: "veterinario",
                        nombres: "veterinario",
                        direccion: "veterinario",
                        telefono: "veterinario",
                        id_rolPersona: role.id
                    };
                    var datosC = {
                        visible: true,
                        correo: "veterinario",
                        clave: "veterinario@12345:}}--.",
                        usuario: "veterinario"
                    };
                    var Veterinario = new veterinarioC(datosV);
                    var Cuenta = new cuenta(datosC);
                    Veterinario.cuenta = Cuenta;
                    Veterinario.saveAll({ cuenta: true }).then();
                } else {
                }
            }).error(function (error) {
                console.log(error)
            });
        }
    }).error(function (error) {
        console.log(error);
    });
}
module.exports = { creacionRoles, creacionVeterinario };