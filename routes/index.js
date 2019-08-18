var express = require('express');
var router = express.Router();

/*
 * bd = usada para la genreacion de roles 
 */
var bd = require('../modelos/rol');

var mascotavControl = require('../controladores/mascotavControlador');
var mascota1 = new mascotavControl();



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

var utilidades = require('../controladores/utilidades');



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
        req.flash('error', 'Debes iniciar sesion primero!');
        res.redirect('/');
    }
};
router.get('/', function (req, res, next) {
    /*
     * creacionRoles() = permite generar por primera vez los roles
     */
    utilidades.creacionRoles();
    /*
     * creacionVeterinario() = permite generar por primera vez el veterinario
     */
    utilidades.creacionVeterinario();
    /*
     * verifica si existe una sesion activa, caso contrario se encontrara en el principal(publico)
     */
    if (req.session !== undefined && req.session.cuenta !== undefined) {
        res.render('index', {
            title: "Veterinaria", fragmento: 'principal', sesion: true, id: req.session.cuenta.id, external: req.session.cuenta.external, usuario: req.session.cuenta.usuario, persona: req.session.cuenta.persona,
            msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') }
        });
    } else {
        res.render('index', {
            title: 'Publico', msg: {
                error: req.flash('error'),
                info: req.flash('info'), ok: req.flash('success')
            },
            fragmento: 'Publico'
        });

    }
});

/*
 * permite redireccionar a la plantilla para poder registrar un clietne
 */
router.get('/registrarUsuario', function (req, res, next) {
    res.render('index', { title: 'Registrate', fragmento: 'registroUsuario', registro: 'registro', msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') } });

});

//foro
router.get('/foro', function (req, res, next) {
    res.render('index', { title: 'Foro', fragmento: 'foro', inicio: 'inicio', ventanas: "ventanas", msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') } });

});
//acerca
router.get('/acerca', function (req, res, next) {
    res.render('index', { title: 'Foro', fragmento: 'AcercadeNosotros', inicio: 'inicio', ventanas: "ventanas", msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') } });

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

router.post('/veterinario/registro/mascota', sacar, mascota.guardarDesdeVeterinario);

//<-------------------Veterinario---------------->
/*
 * post = permite la modificacion de los datos de un veterinario
 */
router.post('/configuracionVeterinario', veterinario.configuracionVeterinario);
/*
 * get = permite visualizar losd atos a modificar el veterinario
 */
router.get('/configuracionVeterinario/:external', sacar, veterinario.visualizarConfiguracion);
/*
 * get = permite la visualizacion del formulario previo a registrar
 */
router.get('/registrarVeterinario', sacar, veterinario.registroVeterinario);
/*
 * post = permite guardar los datos de un nuevo veterinario
 */
router.post('/registroVeterinario', veterinario.guardar);

router.get('/historialClinico', sacar, veterinario.verHistorialClinico);
router.get('/listaVeterinarios', sacar, veterinario.verListaVeterinario);
/*
 * get = permite visualizar el listado de paciente con sus respectivas mascotas
 */
router.get('/registroMascotaVeterinario', sacar, veterinario.listadoPacientes);

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


router.get('/listaclientes', mascota1.verReg);
// router.post('/guardarmascotacliente', mascota1.guardarMV);
router.get('/registroMascota/:external', sacar, mascota1.visualizarModificar);
// router.post('/registroMascota', mascota1.guardarMascota);

router.get('/veterinario/mascota/listaHistorial', function (req, res, next) {
    res.render('index', { title: 'Historial', fragmento: 'veterinario/mascota/historial/listaHistorial', inicio: 'inicio', ventanas: "ventanas", msg: { error: req.flash('error'), info: req.flash('info'), ok: req.flash('success') } });

});
/**
 * rutas para cargar datos para modificar y actualizar clientes
 */
router.get("/cargarDatosPersona", usuario.cargardatosCliente);
router.post('/actualizar', usuario.modificarC);

router.get("/cargarDatosMascota", mascota.cargardatosMascota);
router.post('/actualizarMascota', mascota.modificarM);


module.exports = router;
