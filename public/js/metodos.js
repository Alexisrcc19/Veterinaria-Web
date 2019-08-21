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

function manejoMensajes(msg) {
    //console.log(error);
    var mensaje = '<div class="alert alert-danger">';
    mensaje += msg;
    mensaje += '</div>';
    $("#error").html(mensaje);
}


function calcularEdad(fecha) {
    //    var fecha = document.getElementById("fecha");
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log("TIENES: " + edad + " ANIOS");
    return edad;
}




function validarveterinario() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");

    $.validator.addMethod("registro", function (value, element) {
        return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
    }, "Ingrese un registro valido ejemplo N-0000-R-000");

    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");


    $("#formulario").validate({
        rules: {
            cedula: {
                number: true,
                required: true,
                minlength: 10,
                maxlength: 10,
                validacedula: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            direccion: {
                required: true
            },
            telefono: {
                required: true,
                number: true
            },
           claveAnterior: {
                required: true
            },
           claveActual: {
                required: true
            },
            usuario: {
                required: true
            },
            correo: {
                required: true
            },
            clave: {
                required: true,
                minlength: 5,
                maxlength: 10
            }
        }
    });
}

function validarcliente() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");

    $.validator.addMethod("registro", function (value, element) {
        return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
    }, "Ingrese un registro valido ejemplo N-0000-R-000");

    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");


    $("#formularioC").validate({
        rules: {
            cedula: {
                number: true,
                required: true,
                minlength: 10,
                maxlength: 10,
                validacedula: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            direccion: {
                required: true
            },
            telefono: {
                required: true,
                number: true
            },

            usuario: {
                required: true
            },
            correo: {
                required: true
            },
            clave: {
                required: true,
                minlength: 5,
                maxlength: 10
            }
        }
    });
}

function validarMascota() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");

    $('#guardar').click(function () {
        if ($('#especie').val().trim() === '') {
            alert('selecione la especie');
        } else {
            //            alert('especie seleccionado correctamente');
        }
    });
    $("#formularioM").validate({
        rules: {

            nombre: {
                required: true,
                soloLetras: true
            },
            raza: {
                required: true,
                soloLetras: true
            },
            edad: {
                required: true,
                number: true
            },
            tipo: {
                required: true,
                soloLetras: true
            },


        }
    });
}

function validarRegistro() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");

    $.validator.addMethod("registro", function (value, element) {
        return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
    }, "Ingrese un registro valido ejemplo N-0000-R-000");

    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");
    $("#tablareg").validate({
        rules: {

            nombre: {
                required: true,
                soloLetras: true
            },
            raza: {
                required: true,
                soloLetras: true
            },
            edad: {
                required: true,
                number: true
            },
            tipo: {
                required: true,
                soloLetras: true
            },
            cedula: {
                number: true,
                required: true,
                minlength: 10,
                maxlength: 10,
                validacedula: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            direccion: {
                required: true
            },
            telefono: {
                required: true,
                number: true
            },

            usuario: {
                required: true
            },
            correo: {
                required: true
            },
            clave: {
                required: true,
                minlength: 5,
                maxlength: 10
            }
        }
    });


}
function validarConfiguracionUsuario() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");

    $.validator.addMethod("registro", function (value, element) {
        return this.optional(element) || /^[N]-[0-9]{4}-[R]-[0-9]{3}$/.test(value);
    }, "Ingrese un registro valido ejemplo N-0000-R-000");

    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");


    $("#tablaconfigU").validate({
        rules: {
            cedulaU: {
                number: true,
                required: true,
                minlength: 10,
                maxlength: 10,
                validacedula: true
            },
            apellidosU: {
                required: true,
                soloLetras: true
            },
            nombresU: {
                required: true,
                soloLetras: true
            },
            direccionU: {
                required: true
            },
            telefonoU: {
                required: true,
                number: true
            },

            usuarioU: {
                required: true
            },
            correoU: {
                required: true
            },
            claveU: {
                required: true,
                minlength: 5,
                maxlength: 10
            },
            clavenU1: {
                required: true,
                minlength: 5,
                maxlength: 10
            },
            clavenU2: {
                required: true,
                minlength: 5,
                maxlength: 10,
                equalTo: "#clavenU1"
            }
        },
        messages: {
            clavenU1: {
                required: ""
            },
            clavenU2: {
                required: "no coinsiden los caracteres"
            }
        }
    });
}