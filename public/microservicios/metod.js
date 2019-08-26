var url_base = "http://localhost:3000/";
/**
 * @description funcion que permite llenar datos del cliente para si actualizacion desde veterinario
 * @param {external} external 
 */
function llenardatosCliente(external) {
    var url = url_base + "cargarDatosPersona";
    console.log(url);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
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
 * @description funcion q permite llenar datos de una mascota para previo actualizacion
 * @param {external} external 
 */
function llenardatosMascota(external) {
    var url = url_base + "cargarDatosMascota";
    console.log(external);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
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
/**
 * @description funcion q permite llenar datos de historial de una mascota para previo actualizacion
 * @param {external} external 
 */
function llenardatosHistorial(external) {
    var url = url_base + "cargarDatosHistorial";
    console.log(external);
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
/**
 * @description funcion q permite llenar datos usuario para previo configuracion desde su vista
 * @param {external} external 
 */
function llenardatosUsuario(external) {
    var url = url_base + "cargarDatosUsuario";
    console.log(external);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
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
/**
 * @description funcion q permite llenar datos de una foro para su visualizacion
 * @param {external} external 
 */
function llenardatosForo(external) {
    var url = url_base + "cargarDatosForo";
    console.log(external);
    var external = external;
    $.ajax({
        url: url,
        dataType: 'json',
        data: 'external=' + external,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#externalF").val(data.external_id);
            $("#temaF").val(data.foro);
            $("#nombreF").val(data.persona)
        }
    });
};
/**
 * @description funcion q permite llenar datos de  servicio para modificar
 * @param {external} external 
 */
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
            $("#externalS").val(data.id);
            $("#nombreS").val(data.nombre);
            $("#tipoPagoS").val(data.formaPago);
            $("#costoS").val(data.valor);
        }
    });
};
/**
 * @description funcion q permite llenar datos en el combo box de servicios
 */
function llenarComboServicio() {
    var url = url_base + "servicioCombo";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var opcion = '';

            $.each(data, function (index, item) {
                opcion += '<option  value= ' + item.nombre + '>' + item.nombre + '</option>';
            });
            $("#servicioA").html(opcion);
              
                

        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            alert("ERROR");
        }
    });
}
/**
 * @description funcion que permite implementar el plugin DataTable en la vista de las listas
 */
function dataTable() {
    $('#tablaLCliente').DataTable({
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
        "dom": "Blfrtip",
        "buttons": [ 'pdf'],
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
    $('#tablaLCitaV').DataTable({
        "dom": "Blfrtip",
        "buttons": ['pdf'],
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
    $('#tablaLCitaC').DataTable({
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

