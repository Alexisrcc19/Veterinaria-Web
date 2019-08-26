var express = require('express');
var router = express.Router();
//CITA Y SERVICIOS
var comentario = require('../modelos/comentarios');
var ci = require('../modelos/cita');
var se = require('../modelos/servicio');
var foro = require('../modelos/foro');
var eliminarControlador = require('../controladores/eliminarControlador');
var eliminar = new eliminarControlador();
/**
 * @description se usa para la generacion de roles
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
var veterinarioControl = require('../controladores/veterinarioControlador');
var veterinario = new veterinarioControl();
var cuentaControlador = require('../controladores/CuentaControlador');
var cuenta = new cuentaControlador();
var mascotacontrol = require('../controladores/mascotaControlador');
var mascota = new mascotacontrol();
var usuarioControl = require('../controladores/usuarioControlador');
var usuario = new usuarioControl();
var citaControl = require('../controladores/citaControlador');
var cita = new citaControl();
var pagoControl = require('../controladores/pagoControlador');
var pago = new pagoControl();
var servicioControl = require('../controladores/servicioControlador');
var servicio = new servicioControl();
/**
     * @description funcion que permite cverificar inicio de session
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
function verificar_inicio(req) {
    return (req.session !== undefined && req.session.cuenta !== undefined);
}
/**
     * @description método que permite enviar mensaje y confirmacion de inicio session
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
var sacar = function (req, res, next) {
    if (verificar_inicio(req)) {
        next();
    } else {
        req.flash('error', 'Debes estar iniciado sesion');
        res.redirect('/');
    }
};
/**
     * @description método que permite verificar la session del veterinario
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
var CuentaVeterinario = function (req, res, next) {
    var ver = req.session.cuenta.persona;
    if (ver === true) {
        next();
    } else {
        req.flash('error', 'esto le pertenece al veterinario');
        res.redirect('/');
    }
};
/**
     * @description método que permite verificar la session del cliente
     * @param {req} req objeto petición
     * @param {res} res objeto respuesta 
     */
var CuentaUsuario = function (req, res, next) {
    var ver = req.session.cuenta.persona;
    if (ver === false) {
        next();
    } else {
        req.flash('error', 'esto le pertenece al usuario');
        res.redirect('/');
    }
}
router.get('/', principal.verPrincipal);
/**
 * @description ruta para redirecionar a una pantalla y reistrar un cliente
 */
router.get('/registrarUsuario', function (req, res, next) {
    res.render('index', {
        title: 'Registrate',
        fragmento: 'registroUsuario',
        registro: 'registro',
        ventanas: "ventanas",
        msg: {
            error: req.flash('error'),
            info: req.flash('info'),
            ok: req.flash('success')
        }
    });
});
/**
 * @description rutas get y post para visualizar guardar y listar el foro
 */
router.get("/cargarDatosForo", sacar, CuentaVeterinario, foro.cargardatosForo);
router.get('/foro', foro.listadoForo);
router.get('/foroVeterinario', sacar, CuentaVeterinario, foro.listadoForoVeterinario);
router.post('/registroForo', foro.guardar);
router.post('/responderForo', sacar, CuentaVeterinario, foro.responder);
/**
 * @description ruta para mostrar acerca de nostros 
 */
router.get('/acerca', function (req, res, next) {
    res.render('index', {
        title: 'Foro',
        fragmento: 'AcercadeNosotros',
        inicio: 'inicio',
        ventanas: "ventanas",
        msg: {
            error: req.flash('error'),
            info: req.flash('info'),
            ok: req.flash('success')
        }
    });
});
/**
 * @description ruta para listar guardar visualizar y actualizar mascota desde veterinario
 */
router.get('/registroMascota', sacar, mascota.visualizar);
router.post('/registro/mascota', sacar, mascota.guardar);
router.post('/veterinario/registro/mascota', sacar, CuentaVeterinario, mascota.guardarDesdeVeterinario);
/**
 * @description rutas que redireciona a una pantalla para registro d eun veterinario
 */
router.get('/registrarVeterinario', sacar, CuentaVeterinario, veterinario.registroVeterinario);
router.post('/registroVeterinario', sacar, CuentaVeterinario, veterinario.guardar);
/**
 * @description rutas para mostra listado de los clientes 
 */
router.get('/registroMascotaVeterinario', sacar, CuentaVeterinario, veterinario.listadoPacientes);
/**
 * @description rutas propios del usuario de su vista
 */
router.post('/registroUsuario', usuario.guardar);
/**
 * @description analisa en ingreso al sistema previo al registro
 */
router.post('/inicio_sesion', cuenta.iniciar_sesion);
/**
 * @description ruta permite destruir session
 */
router.get('/cerrar_sesion', sacar, cuenta.cerrar_sesion);
/**
 * @description rutas propias de
 */
router.get('/listaCitas', sacar, cita.verListaCitas);

router.get('/listaPagos', sacar, pago.verListaPagos);
router.get('/GestionPagos', sacar, pago.verGestionPagos);
/**
 * @description ruta para visualizar mascota
 */
router.get('/listaclientes', sacar, CuentaVeterinario, mascota1.verReg);
router.get('/registroMascota/:external', sacar, CuentaVeterinario, mascota1.visualizarModificar);
router.get('/veterinario/mascota/listaHistorial/:external/:external_idP', sacar, CuentaVeterinario, historial.verHistorial);
router.post('/veterinario/registro/historial', sacar, CuentaVeterinario, historial.guardarHistorial);
router.get('/listaHistorialMascotas', sacar, CuentaVeterinario, historial.listaHistorialMascotas);
/**
 * @description rutas para cargar datos para modificar y actualizar clientes
 */
router.get("/cargarDatosPersona", sacar, CuentaVeterinario, usuario.cargardatosCliente);
/**
 * @description rutas para cargar y modificar datos del historial
 */
router.get("/cargarDatosHistorial", sacar, historial.cargardatosHistorial);
router.post('/actualizarHistorial', historial.modificarH);
router.post('/actualizar', sacar, usuario.modificarC);
/**
 * @description rutas para cargar y modifiacr datos de la mascota 
 */
router.get("/cargarDatosMascota", mascota.cargardatosMascota);
router.post('/actualizarMascota', mascota.modificarM);
/**
 * @description ruta para vizualizar y configurar cuenta de usuario
 */
router.get("/cargarDatosUsuario", usuario.cargardatosUsuario);
router.post('/configurarUsuario', usuario.configurarUsuario);
/**
 * @description rutas propias de los comentarios
 */
router.get('/comentario', sacar, CuentaUsuario, comentario.dejarComentario);
router.post('/registroComentario', sacar, CuentaUsuario, comentario.guardarComentario);

/**
 * @description rutas propias de los citas medicas
 */
router.get("/cliente/cita/agendar", sacar, cita.verRegistro);
router.post('/cliente/cita/agendar', sacar, cita.guardarCita);
router.get('/veterinario/cita/listaCitas', sacar, cita.verListaCitas);

/**
 * @description rutas propias de los servios
 */
router.get('/veterinario/servicio/registro', sacar, servicio.verRegistroServicio);
router.post('/veterinario/servicio/registro', sacar, servicio.guardarServicio);
router.get('/veterinario/servicio/listaServicio', sacar, servicio.verListadoServicio);
router.get('/servicio/datosModi', sacar, servicio.cargardatosServicio);
router.post('/veterinario/servicio/modificar', sacar, servicio.modificarServicio);
router.get('/servicioCombo', sacar, servicio.CargarServicios);
/**
 * @description rutas pertenecen a lo que respecta elimanacion de datos
 */
router.post('/eliminarComentario', sacar, CuentaVeterinario, eliminar.eliminarComentario);
router.post('/eliminarMascota', sacar, eliminar.eliminarMascota);
router.post('/eliminarHistorialM', sacar, CuentaVeterinario, eliminar.eliminarHistorial);
router.post('/eliminarUsuario', sacar, CuentaVeterinario, eliminar.eliminarUsuario);
router.post('/eliminarVeterinario', sacar, eliminar.eliminarVeterinario)
router.post('/eliminarForo', sacar, CuentaVeterinario, eliminar.eliminarForo)
router.get('/pago', function (req, res, next) {
    res.render('pagos');
})
module.exports = router;
