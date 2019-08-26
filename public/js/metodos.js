/**
 * @description funcion para validar cedula ecuatoriana
 * @param {cedula} cedula  
 */
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
/**
 * @description trae fecha actual cambiando de formato
 */
function fechaActual() {
    var d = new Date();
    var mes = (d.getMonth() + 1);
    var dia = d.getDate();
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    $("#fecha").val(fecha);
    return fecha;
}
/**
 * @description funcion para selecionar fecha en el select
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
 * @description funcion pra dar formato al input date
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
 * @description sirve para controlar los dias de atencion
 */
function selectColor() {
    var dia = diaSemana();
    if (dia !== "fin") {
        $("#inf").hide();
        $("#horario").show();
        $("#bcita").show();
    } else {
        $("#inf").show();
        $("#horario").hide();
        $("#bcita").hide();
    }

}
/**
 * @description funcion que permite retoranar el dia segun la fecha
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
 * @description funcion que permite verificar los dias de la semana del sistema
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
 * @description funcion que inhabilita fechas pasadaas
 */
function fechasPasadas() {
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
    }
    console.log("FechaEntrada correcta")
    $("#fechaError").hide();
}
/**
 * @description funcio que permite obtener la hora del sistema
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
 * @description funcion que permite cojer la cita dependiendo de la hora
 */
function fechaSiguiente(fecha) {
    var d = new Date(fecha);
    var mes = (d.getMonth() + 1);
    var dia = (d.getDate() + 2);
    var fecha = (d.getFullYear() + "-" + rellenarCeros(mes, 2) + "-" + rellenarCeros(dia, 2));
    $("#fecha").val(fecha);
    return fecha;
}
/**
 * @description funcion que permite validar la clave de la cuenta actual en caso de configuracion
 */
function validarclave(clave) {
    var claveActual = $("#claveU").val();
    console.log(claveActual)
    if (clave === claveActual) {
        return true;
    }
    return false;
}
/**
 * @description funcion para validar el registro de veterinario desde administrador
 */
function validarveterinario() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
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
/**
 * @description funcion para validar el la vista d elos comentarios
 */
function validarcomentario() {
    $("#formulario").validate({
        rules: {
            comentario: {
                required: true
            }
        }
    });
}
/**
 * @description funcion para validar el la vista del foro
 */
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
/**
 * @description funcion para validar la vista del registro de usuario desde publico
 */
function validarcliente() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");
    $("#tablaregUsuario").validate({
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
/**
 * @description Funcion para modificar un cliente desde veterinario
 */
function modificarUV() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $.validator.addMethod("validacedula", function (value, element) {
        return this.optional(element) || validarCedula(value);
    }, "Cedula no valida");
    $("#modificarUV").validate({
        rules: {
            cedulaM: {
                number: true,
                required: true,
                minlength: 10,
                maxlength: 10,
                validacedula: true
            },
            apellidosM: {
                required: true,
                soloLetras: true
            },
            nombresM: {
                required: true,
                soloLetras: true
            },
            direccionM: {
                required: true
            },
            telefonoM: {
                required: true,
                number: true
            },
            usuarioM: {
                required: true
            },
            correoM: {
                required: true
            },
            claveM: {
                required: true,
                minlength: 5,
                maxlength: 10
            }
        }
    });
}
/**
 * @description funcion para validar los comentarios echos por los clientes 
 */
function validarcomentario() {
    $("#formulario").validate({
        rules: {
            comentario: {
                required: true
            }
        }
    });
}
/**
 * @description funncion para validar la vista de registro de cliente desde publico
 */
function validarcliente() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
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
/**
 * @description funcion para validar el registro de modificar desde usuario de mascota 
 */
function validarMascotaModificarU() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#tablarmm").validate({
        rules: {
            nombreMa: {
                required: true,
                soloLetras: true
            },
            razaMa: {
                required: true,
                soloLetras: true
            },
            edadMa: {
                required: true,
                number: true
            },
            especieMa: {
                required: true,
                soloLetras: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de registro de mascota desde veterinario
 */
function registroMV() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#tablaregMV").validate({
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
            especie: {
                required: true,
                soloLetras: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de modificar de mascota desde veterinrio
 */
function modificarMVe() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#modifiMVe").validate({
        rules: {
            nombreMa: {
                required: true,
                soloLetras: true
            },
            razaMa: {
                required: true,
                soloLetras: true
            },
            edadMa: {
                required: true,
                number: true
            },
            especieMa: {
                required: true,
                soloLetras: true
            }
        }
    });
}
/**
 * @description funcion para validar el registro de mascota desde cliente
 */
function validarMascota() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
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
            especie: {
                required: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de configuracion de cuenta de Cliente
 */
function validarConfiguracionUsuario() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
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
        }

    });
}
/**
 * @description funcion para validar la vista de registro de historial de la mascota desde veterinario
 */
function validarregistroHistorial() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#registrarHV").validate({
        rules: {
            enfermedades: {
                required: true,
                soloLetras: true
            },
            estado: {
                required: true,
                soloLetras: true
            },
            causa: {
                required: true

            },
            tratamiento: {
                required: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de modificar de historial de la mascota desde veterinario
 */
function validarmodificarHistorial() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#modificarHV").validate({
        rules: {
            enfermedadesH: {
                required: true,
                soloLetras: true
            },
            estadoH: {
                required: true,
                soloLetras: true
            },
            causaH: {
                required: true,
            },
            tratamientoH: {
                required: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de servicios desde admsnistrador
 */
function validarServicios() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#tablarerservicios").validate({
        rules: {
            nombre: {
                required: true,
                soloLetras: true
            },
            tipoPago: {
                required: true,
                soloLetras: true
            },
            costo: {
                required: true,
                number: true
            }
        }
    });
}
/**
 * @description funcion para validar la vista de servicios para modificar desde admsnistrador
 */
function tablaregModServicio() {
    $.validator.addMethod("soloLetras", function (value, element) {
        return this.optional(element) || /^[a-ñ-z\s]+$/i.test(value);
    }, "Escriba Solo letras por Favor");
    $("#tablaregModServicio").validate({
        rules: {
            nombreS: {
                required: true,
                soloLetras: true
            },
            tipoPagoS: {
                required: true,
                soloLetras: true
            },
            costoS: {
                required: true,
                number: true
            }
        }
    });
}
/**
 * @description funcion que permite encontrar un elemento dentro de un array
 */
function contieneValor(array, valor) {
    for (var i = 0; i < array.length; i++) {
        if (valor == array[i]) {
            //  console.log('Si existe');
            //return valor;
            console.log("valor:" + valor);
            console.log("HORARIO Y DIV IGUALES")
            return valor;
            break;
        }
    }
}
/**
 * @description funcion que permite guardar datos de un selec en un array
 */
function recorrerSelect(sel) {
    var array = [sel.length];
    for (var i = 0; i < sel.length; i++) {
        var opt = sel[i];
        array[i] = opt.value;
    }
    return array;
}