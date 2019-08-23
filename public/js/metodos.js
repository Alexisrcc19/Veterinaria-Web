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
/**
 * metodo para validar la clave de l a cuenta y poder gonfigurar la cunenta
 * @param {clave} clave 
 */
function validarclave(clave) {
    var claveActual = $("#claveU").val();
    console.log(claveActual)
    if (clave === claveActual) {
        return true;
    }
    return false;
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
function validarcomentario() {


    $("#formulario").validate({
        rules: {
            comentario: {
                required: true
            }
        }
    });
}
function validarforo() {


    $("#formulario").validate({
        rules: {
            foro: {
                required: true
            },
            nombre: {
                required: true
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

    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");
    $.validator.addMethod("validaClave", function (value, element) {
        return this.optional(element) || validarclave(value);
    }, "CLAVE ACTUAL ERRONEA");
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
            claveActual: {
                required: true,
                validaClave: true

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
        message: {
            claveActual: "clave actual erronea"
        }

    });

}

/**
 * Obtiene la fecha actual
 * @returns {String}
 */
function fechaActual() {

    //alert(fecha);
    var d = new Date();
    //alert((d.getDate()+"/"+(d.getMonth()+1))+"/"+d.getFullYear());
    var mes = (d.getMonth() + 1);
    var dia = d.getDate();
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    //  console.log("actual "+fecha);

    $("#fecha").val(fecha);
    return fecha;
}
/**
 * Devuelve una fecha especificada
 * @param {type} fecha 
 * @returns {String}
 */
function fechaE(fecha) {
    var d = new Date(fecha);
    var mes = (d.getMonth() + 1);
    var dia = (d.getDate() + 1);
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    // console.log("escogida: "+fecha);
    return fecha;
}
/**
 * Da formato a la fecha para que se pueda ajustar al input de tipo date 
 * @param {type} texto
 * @param {type} nro_cero
 * @returns {String}
 */
function rellenarCeros(texto, nro_cero) {
    texto = texto + "";
    if (texto.length < nro_cero) {
        var aux = "";
        for (var i = texto.length; i < nro_cero; i++) {
            aux += "0";
        }
        return aux + texto;
    } else {
        return texto;
    }
}
/**
 * Pinta los horarios dependiendo si estos estan agendados o no
 * #91DD68 -> Este color en caso de que la cita ya este agendada
 * #F07979 -> Este color en caso de que la cita aun no este agendada
 * @returns {undefined}
 */
function selectColor() {
    var dia = diaSemana();
    // console.log("THIS DAY" + dia);
    if (dia !== "fin") {
        $("#inf").hide();
        $("#horario").show();
        $("select option[value='1']").css("background-color", "#F07979");
        $("select option[value='0']").css("background-color", "#91DD68");
    } else {
        $("#inf").show();
        $("#horario").hide();
        // $("#inf").prop('disabled', 'disabled');
    }

}
/**
 * Retorna el nombre del dia, segun la fecha.
 * @returns {String}
 */
function diaSemana() {
    var fa = $("#fecha").val();
    var f = new Date(fa);
    var dia = f.getDate();
    var mes = f.getMonth() + 1;
    var anio = f.getFullYear();
    return verificar_diaSemana(dia, mes, anio);

}
/**
 * Retorna propiamente el valor(nombre) del dia actual
 * @param {type} dia
 * @param {type} mes
 * @param {type} anio
 * @returns {String}
 */
function verificar_diaSemana(dia, mes, anio) {
    // var dias = [ "lun", "mar", "mie", "jue", "vie", "sab", "dom"];
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "fin", "fin"];
    var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
    var d = dias[dt.getUTCDay()];
    // console.log(d);
    return d;
}
/**
 * Retorna un valor booleano que permite inhabilitar fechas expiradas
 * @returns {Boolean}
 */
function fechasPasadas() {
    //  console.log("FECHA ACTUAL.METODO FECHAS APSADAS: "+ fechaActual());
    document.getElementById("fecha").setAttribute("min", fechaActual());
    var fechaEntrada = fechaE($("#fecha").val());
    var fechaLimite = fechaActual();
    console.log("entrada " + fechaEntrada);
    console.log("limite " + fechaLimite);
    console.log("FE:" + new Date(fechaEntrada).getTime());
    console.log("FL:" + new Date(fechaLimite).getTime());
    if ((new Date(fechaEntrada).getTime() < new Date(fechaLimite).getTime())) {
        console.log("FEcha Entrada incorrecta");
        $("#fechaError").show();
        //$("#horario").prop('disabled', false);
    }

    console.log("FechaEntrada correcta")
    $("#fechaError").hide();
}
/**
 * Comprueba la hora actual
 * true= hora no disponible en el horario de atencion de la veterinario
 * false= hora dentro del horario de atencion de la veterinaria
 * @returns {Boolean}
 */
function obtenerHora() {
    var d = new Date();
    var hora = d.getHours();
    console.log("hora: " + hora);
    if (hora < 17) {
        return true;
        console.log("verdadero");
        $("#alerta").hide();
    } else {
        return false;
        $("#alerta").show();
        console.log("falso");
    }
}
/**
 * Devuelve la fecha siguiente a la fecha actual
 * @param {type} fecha
 * @returns {String}
 */
function fechaSiguiente(fecha) {
    var d = new Date(fecha);
    var mes = (d.getMonth() + 1);
    var dia = (d.getDate() + 2);
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    //   console.log("escogida: "+fecha);
    $("#fecha").val(fecha);
    return fecha;
}


