'use strict';
/**
 * importacion del modelo mascota
 * @type Module mascota|Module mascota
 */
var mascota = require('../modelos/mascota');


class MascotaControl {
    /**
     * 
     * @param {type} req = usado para recuperar el id de la persona en sesion, para el envio de mensajes
     * @param {type} res = usado para la redireccion de las plantillas, ya sea para el registro de la mascota o para la pagina principal
     * @returns {undefined}
     */
    visualizar(req, res) {
        /**
         * mascota = modelo usado para poder listar atodas la mascotas registradas por el usuario o cliente
         * 
         * getJoin = para la relacion de las tablas MASCOTA-PERSONA, en este caso es el propietario de la mascota
         * 
         * filter = usado para filtar el id_cliente, el cual es la relacion que existe enre mascota y cliente, y una vez usado
         * se listan unicamente las mascotas de dicho cliente
         * 
         * then() = usado para realizar el collback dentro de la mascota con el modelo y el filter incluido
         */
        mascota.getJoin({persona: true}).filter({id_cliente: req.session.cuenta.id}).then(function (lista) {
            var mas = false;
            /**
             * mas = variable ceada para verificar mas adelante
             */
            if (lista.length <= 0) {
                /**
                 * lista.length = usada para poder verificar si la lista esta vacia, en cuyo caso se le mostrara al cliente que aun 
                 * no tiene mascotas registradas, e lugar de salir un tabla vacia, enviandole la variable "mas" con false por termas de la plantillas "hbs"
                 */
                mas = false;
            } else {
                /**
                 * caso contrario = usado para enviar la variable "mas" con el valor de true, queriendo decir que si existen mascotas registradas,
                 * y por ende se podra visualizar el listado de dichas mascotas 
                 */
                mas = true;
            }
            res.render('index', {title: 'Veterinaria', fragmento: 'registroMascota', mas: mas, lista: lista, ventanas: "ventanas",
                msg: {error: req.flash('error'), info: req.flash('info'), ok: req.flash('success')}});
        }).error(function (error) {
            /**
             * error = error en el cual se informa al usuario que hubo error el cual debe ser tratado por los desarrolladores,
             * ya que se trata de un error al momento de ver los datos del modelo "mascota"
             */
            req.flash('error', 'por favor comuniquese con los desarrolladores');
            res.redirect('/');
        });

    }
    /**
     * 
     * @param {type} req = usado para rescatar el id de la persona en la cual se va a relacionar la mascota, usado para tambien 
     * extraer los datos del formulario, y enviar mensajes de respuesta 
     * @param {type} res = usado para la redireccion de plantillas
     * @returns {undefined}
     */
    guardar(req, res) {
        /**
         * 
         * @type idper = variable creada para conocer el id de la persona la cual esta iniciada sesion
         */
        var idper = req.session.cuenta.id;
        /**
         * 
         * @type data = son los datos de la mascota a guardar con el id_cliente respectivo, dependiendo del usuario en sesion
         */
        var data = {
            raza: req.body.raza,
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipo: req.body.tipo,
            especie: req.body.especie,
            id_cliente: idper
        };
         /**
          * 
          * @type mascota = dato instanciado incluyendole la "data", la cual contiene toda la informacion de la mascota a registrar
          */
        var mascotaD = new mascota(data);
        /**
         * save() = metodo usado para guardar directametne en la base de datos
         */
        mascotaD.save().then(function () {
            req.flash('info', 'mascota registrada');
            res.redirect('/registroMascota');
        }).error(function () {
            req.flash('error', 'No se pudo guardar');
            res.redirect('/');
        });
    }
    guardarDesdeVeterinario(req, res) {
        /**
         * 
         * @type idper = variable creada para conocer el id de la persona la cual esta iniciada sesion
         */
        var idper = req.body.idCli;
        /**
         * 
         * @type data = son los datos de la mascota a guardar con el id_cliente respectivo, dependiendo del usuario en sesion
         */
        var data = {
            raza: req.body.raza,
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipo: req.body.tipo,
            especie: req.body.especie,
            id_cliente: idper
        };
         /**
          * 
          * @type mascota = dato instanciado incluyendole la "data", la cual contiene toda la informacion de la mascota a registrar
          */
        var mascotaD = new mascota(data);
        /**
         * save() = metodo usado para guardar directametne en la base de datos
         */
        mascotaD.save().then(function () {
            req.flash('info', 'mascota registrada');
            res.redirect('/registroMascota');
        }).error(function () {
            req.flash('error', 'No se pudo guardar');
            res.redirect('/');
        });
    }

    visualizarModificar(req, res) {
        var external = req.params.external;
        console.log("cualqier huevada"+external);
        mascota.getJoin({persona: true}).filter({id_cliente: req.session.cuenta.id}).then(function (datosM) {
            //console.log(datosM);
            if (datosM.length > 0) {
                var mascotaM = datosM[0];
                res.render('index',
                        {title: 'Mascota',
                            fragmento: "veterinario/mascota/modificar",
                            sesion: true,
                            masco: mascotaM,
                            msg: {error: req.flash('error'), info: req.flash('info')}
                        });

            } else {
                req.flash('error', 'Nose pudo mostrar lo solicitado');
                res.redirect('veterinario/mascota/lista');
            }
        }).error(function (error) {

        });
    }
}
/**
 * exportacion de la clase MascotaControl
 */
module.exports = MascotaControl;








