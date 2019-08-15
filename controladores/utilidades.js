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

function creacionRoles(){
    var rol = require('../modelos/rol');
    rol.run().then(function (roles){
       if(roles.length <= 0){
           rol.save([{nombre: "veterinario"}, {nombre:"usuario"}]);
           console.log(roles);
       } 
           console.log(roles);
       
    }).error(function (error){
        console.log(error);
    });
}
function creacionVeterinario(){
    var veterinario = require('../modelos/Veterinario');
    var cuenta = require('../modelos/cuenta');
    veterinario.run().then(function (nuevoVeterinario){
       if(nuevoVeterinario.length <= 0){
            var datosV = {
                            cedula: "veterinario",
                            apellidos: "veterinario",
                            nombres: "veterinario",
                            direccion: "veterinario",
                            telefono: "veterinario",
                            id_rolVeterinario: "veterinario"
                        };

                        var datosC = {
                            correo: "veterinario",
                            clave: "veterinario",
                            usuario: "veterinario"
                        };
          var vet = new veterinario(datosV);
                        var Cuenta = new cuenta(datosC);
                        vet.cuenta = Cuenta;
                        vet.saveAll({cuenta: true});
           console.log(nuevoVeterinario);
       } 
           console.log(nuevoVeterinario);
       
    }).error(function (error){
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
module.exports= {creacionRoles, creacionVeterinario};