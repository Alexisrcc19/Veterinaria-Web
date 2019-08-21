//visualizar Cliente  para modificar
var url_base = "http://localhost:3000/";

function llenardatosCliente(external) {
    var url = url_base + "cargarDatosPersona";
    console.log(url);
    //en el controlador se recibe los mismo datos que estan aqui en el servicio texto = a req.query.texto en el contrlador
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            // console.log(data.cedula);
            $("#externalM").val(data.external_id);
            $("#cedulaM").val(data.cedula);
            $("#nombresM").val(data.nombres);
            $("#apellidosM").val(data.apellidos);
            $("#telefonoM").val(data.telefono);
            $("#direccionM").val(data.direccion);
            $("#usuarioM").val(data.cuenta.usuario);
            $("#correoM").val(data.cuenta.correo);
            $("#claveM").val(data.cuenta.clave);
        }
    });
};
/**
 * metodo para llenar datos en formulario de odificar
 * @param {external_id de mascota} external 
 */

function llenardatosMascota(external) {
    var url = url_base + "cargarDatosMascota";
    console.log(external);
    //en el controlador se recibe los mismo datos que estan aqui en el servicio texto = a req.query.texto en el contrlador
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            // console.log(data.edad);
            $("#externalMa").val(data.external_id);
            $("#nombreMa").val(data.nombre);
            $("#razaMa").val(data.raza);
            $("#edadMa").val(data.edad);
            $("#tipoMa").val(data.tipo);
            $("#sexoMa").val(data.sexo);
            $("#especieMa").val(data.especie);
        }
    });
};
function llenardatosHistorial(external) {
    var url = url_base + "cargarDatosHistorial";
    console.log(external);
    //en el controlador se recibe los mismo datos que estan aqui en el servicio texto = a req.query.texto en el contrlador
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#externalHistorialH").val(data.external_id);
            $("#causaH").val(data.causa);
            $("#estadoH").val(data.estado);
            $("#enfermedadesH").val(data.enfermedades);
            $("#tratamientoH").val(data.tratamiento);

        }
    });
};