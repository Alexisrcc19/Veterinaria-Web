var express = require('express');
var router = express.Router();
//CITA Y SERVICIOS
var comentario = require('../modelos/comentarios');
var ci = require('../modelos/cita');
var se = require('../modelos/servicio');
var foro = require('../modelos/foro');

var eliminarControlador = require('../controladores/eliminarControlador');
var eliminar = new eliminarControlador();

/*
 * bd = usada para la genreacion de roles 
 */
var bd = require('../modelos/rol');
var com = require('../modelos/comentarios');

var foroControlador = require('../controladores/foroControlador');
var foro = new foroControlador();


var comentarioControlador = require('../controladores/comentarioControlador');
var comentario = new comentarioControlador();

var mascotavControl = require('../controladores/mascotavControlador');
var mascota1 = new mascotavControl();

var historialControlador = require('../controladores/HistorialControlador');
var historial = new historialControlador();


var principalControlador = require('../controladores/principalControlador');
var principal = new principalControlador();
/*
 * 
 * @type Module veterinarioControlador|Module veterinarioControlador
 */
var veterinarioControl = require('../controladores/veterinarioControlador');
/*
 * 
 * @type veterinarioControl instanciado
 */
var veterinario = new veterinarioControl();
/*
 * 
 * @type Module CuentaControlador|Module CuentaControlador
 */
var cuentaControlador = require('../controladores/CuentaControlador');
/*
 * 
 * @type cuentaControlador instanciado
 */
var cuenta = new cuentaControlador();
/*
 * 
 * @type Module mascotaControlador|Module mascotaControlador
 */
var mascotacontrol = require('../controladores/mascotaControlador');
/*
 * 
 * @type mascotacontrol instanciado
 */
var mascota = new mascotacontrol();
/*
 * 
 * @type Module usuarioControlador|Module usuarioControlador
 */
var usuarioControl = require('../controladores/usuarioControlador');
/*
 * 
 * @type usuarioControl instanciado
 */
var usuario = new usuarioControl();
/*
 * 
 * @type Module citaControlador|Module citaControlador
 */
var citaControl = require('../controladores/citaControlador');
/*
 * 
 * @type citaControl instanciado
 */
var cita = new citaControl();
/*
 * 
 * @type Module pagoControlador|Module pagoControlador
 */
var pagoControl = require('../controladores/pagoControlador');
/*
 * 
 * @type pagoControl instanciado
 */
var pago = new pagoControl();
/*
 * 
 * @type Module utilidades|Module utilidades
 */
/**
 * @type Module servicioControlador|Module servicioControlador
 */
var servicioControl= require('../controladores/servicioControlador');
/**
 * @type servicioControl |Servicio instanciado
 */
var servicio= new servicioControl();

/* GET home page. */
/*
 * verificar_inicio = funcion que permite verificar  si una persona se encuentra iniciada sesion
 */
function verificar_inicio(req) {
    return (req.session !== undefined && req.session.cuenta !== undefined);
}
/*
 * funcion que me permite negar el acceso a la pagina sin antes haber iniciado sesion
 */
var sacar = function (req, res, next) {
    if (verificar_inicio(req)) {
        next();
    } else {
        req.flash('error', 'Debes estar iniciado sesion');
        res.redirect('/');
    }
};
var CuentaVeterinario = function (req, res, next) {
    var ver = req.session.cuenta.persona;
    if (ver === true) {
        next();
    } else {
        req.flash('error', 'esto le pertenece al veterinario');
        res.redirect('/');
    }
};
var CuentaUsuario = function (req, res, next) {
    var ver = req.session.cuenta.persona;
    if (ver === false) {
        next();
    } else {
        req.flash('error', 'esto le pertenece al usuario');
        res.redirect('/');
    }
}
router.get('/' , principal.verPrincipal);

/*
 * permite redireccionar a la plantilla para poder registrar un clietne
 */
router.get('/registrarUsuario', function (req, res, next) {
    res.render('index', {title: 'Registrate', fragmento: 'registroUsuario', registro: 'registro', ventanas: "ventanas", msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});
/*
 * foro de discusiones
 */
router.get("/cargarDatosForo",sacar,CuentaVeterinario, foro.cargardatosForo);
router.get('/foro', foro.listadoForo);
router.get('/foroVeterinario',sacar,CuentaVeterinario, foro.listadoForoVeterinario);
router.post('/registroForo',foro.guardar);
router.post('/responderForo', sacar,CuentaVeterinario, foro.responder);
//acerca
router.get('/acerca', function (req, res, next) {
    res.render('index', {title: 'Foro', fragmento: 'AcercadeNosotros', inicio: 'inicio', ventanas: "ventanas", msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});

});
//<----------------mascota---------------->
/*
 * get = permite visualizar la parte del formulario previo al registro de la mascota
 */
router.get('/registroMascota', sacar, mascota.visualizar);
/*
 * post = permite registrar una nueva mascota
 */
router.post('/registro/mascota', sacar, mascota.guardar);
router.post('/veterinario/registro/mascota', sacar, CuentaVeterinario, mascota.guardarDesdeVeterinario);
//<-------------------Veterinario---------------->

/*
 * get = permite la visualizacion del formulario previo a registrar
 */
router.get('/registrarVeterinario', sacar, CuentaVeterinario, veterinario.registroVeterinario);
/*
 * post = permite guardar los datos de un nuevo veterinario
 */
router.post('/registroVeterinario', sacar, CuentaVeterinario, veterinario.guardar);
router.get('/listaVeterinarios', sacar, CuentaVeterinario, veterinario.verListaVeterinario);
/*
 * get = permite visualizar el listado de paciente con sus respectivas mascotas
 */
router.get('/registroMascotaVeterinario', sacar, CuentaVeterinario, veterinario.listadoPacientes);
//<-----------------------------usuario------------------------>
/*
 * post = permite guardar los datos de nuevo cliente 
 */
router.post('/registroUsuario', usuario.guardar);
//<---------------inicio de sesion----------->
/*
 * post = permite el ingreso de la persona previamente registrada
 */
router.post('/inicio_sesion', cuenta.iniciar_sesion);
/*
 * get = permite destruir la sesion, y salir del sistema, dejando en la pantalla principal(publico)
 */
router.get('/cerrar_sesion', sacar, cuenta.cerrar_sesion);
//citas
router.get('/listaCitas', sacar, cita.verListaCitas);
//pagos en linea
router.get('/listaPagos', sacar, pago.verListaPagos);
router.get('/GestionPagos', sacar, pago.verGestionPagos);
router.get('/listaclientes', sacar, CuentaVeterinario, mascota1.verReg);
// router.post('/guardarmascotacliente', mascota1.guardarMV);
router.get('/registroMascota/:external', sacar, CuentaVeterinario, mascota1.visualizarModificar);
// router.post('/registroMascota', mascota1.guardarMascota);
router.get('/veterinario/mascota/listaHistorial/:external/:external_idP', sacar, CuentaVeterinario, historial.verHistorial);
router.post('/veterinario/registro/historial', sacar, CuentaVeterinario, historial.guardarHistorial);
router.get('/listaHistorialMascotas', sacar, CuentaVeterinario, historial.listaHistorialMascotas);
/**
 * rutas para cargar datos para modificar y actualizar clientes
 */
router.get("/cargarDatosPersona", sacar, CuentaVeterinario, usuario.cargardatosCliente);
/*
 * rutas para cargar y modificar datos del historial
 */
router.get("/cargarDatosHistorial", sacar, historial.cargardatosHistorial);
router.post('/actualizarHistorial', historial.modificarH);
router.post('/actualizar', sacar, usuario.modificarC);
/*
 * rutas para cargar y modifiacr datos de la mascota 
 */
router.get("/cargarDatosMascota", mascota.cargardatosMascota);
router.post('/actualizarMascota', mascota.modificarM);
/**
 * ruta para vizualizar y configurar cuenta de usuario
 */
router.get("/cargarDatosUsuario", usuario.cargardatosUsuario);
router.post('/configurarUsuario', usuario.configurarUsuario);
/*
 * comentarios que el cliente puede dejar a un veterinario
 */
router.get('/comentario', sacar, CuentaUsuario, comentario.dejarComentario);
router.post('/registroComentario', sacar, CuentaUsuario, comentario.guardarComentario);

/**
 * rutas para agendar y gestionar Citas Medica 
 */
router.get("/cliente/cita/agendar", sacar, cita.verRegistro);
router.post('/cliente/cita/agendar', sacar, cita.guardarCita);
router.get('/veterinario/cita/listaCitas', sacar, cita.verListaCitas);

/**
 * Servios de la veterinaria
 */
router.get('/veterinario/servicio/registro',sacar,servicio.verRegistroServicio);
router.post('/veterinario/servicio/registro',sacar,servicio.guardarServicio);
router.get('/veterinario/servicio/listaServicio',sacar,servicio.verListadoServicio);
router.get('/servicio/datosModi',sacar,servicio.cargardatosServicio);
router.post('/veterinario/servicio/modificar',sacar,servicio.modificarServicio);
router.get('/servicioCombo',sacar,servicio.CargarServicios);
/*
 * eliminaciones
 */
router.post('/eliminarComentario', sacar,CuentaVeterinario,eliminar.eliminarComentario);
router.post('/eliminarMascota', sacar, eliminar.eliminarMascota);
router.post('/eliminarHistorialM', sacar,CuentaVeterinario,eliminar.eliminarHistorial);
router.post('/eliminarUsuario', sacar,CuentaVeterinario,eliminar.eliminarUsuario);
router.post('/eliminarVeterinario', sacar,eliminar.eliminarVeterinario)
router.post('/eliminarForo', sacar,CuentaVeterinario,eliminar.eliminarForo)

module.exports = router;
