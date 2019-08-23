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
/**mfuncion para cargar datos de la cuenta de usuario en la vista y configurar cuenta
 * 
 * @param {*} external traemos el external del usuario
 */
function llenardatosUsuario(external) {
    var url = url_base + "cargarDatosUsuario";
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
            $("#externalU").val(data.external_id);
            $("#externalU").val(data.external_id);
            $("#cedulaU").val(data.cedula);
            $("#nombresU").val(data.nombres);
            $("#apellidosU").val(data.apellidos);
            $("#telefonoU").val(data.telefono);
            $("#direccionU").val(data.direccion);
            $("#usuarioU").val(data.cuenta.usuario);
            $("#correoU").val(data.cuenta.correo);
            $("#claveU").val(data.cuenta.clave);
        }
    });
};
function llenardatosForo(external) {
    var url = url_base + "cargarDatosForo";
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
            $("#externalF").val(data.external_id);
            $("#temaF").val(data.foro);
            $("#nombreF").val(data.persona)
        }
    });
};
function llenardatosServicio(external) {
    var url = url_base + "servicio/datosModi";
    console.log(external);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            // console.log(data.edad);
            $("#externalS").val(data.id);
            $("#nombreS").val(data.nombre);
            $("#tipoPagoS").val(data.formaPago);
            $("#costoS").val(data.valor);
        }
    });
};

/**
 * funcion utilizando data table para realizar la busqueda en la lista de clientes
 */
function dataTable() {
    //tabla pedidos data tables para realizar busquedas
    $('#tablaLCliente').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaPforo').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaLMascota').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaUmascota').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaLHistorialP').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaHmascotas').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });
    $('#tablaLServicio').DataTable({
        // "dom": "Blfrtip",
        // "buttons": ['excel', 'pdf', 'copy'],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron resultados en su busqueda",
            "searchPlaceholder": "Buscar registros",
            "info": "Mostrando registros de _START_ al _END_ de un total de  _TOTAL_ registros",
            "infoEmpty": "No existen registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": ordenar de manera Ascendente",
                "sortDescending": ": ordenar de manera Descendente "
            }
        }
    });

   
};


