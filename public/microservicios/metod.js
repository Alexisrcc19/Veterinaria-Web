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