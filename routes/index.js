var express = require('express');
var router = express.Router();
var hbs = require('handlebars');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Veterinaria', principal: 'principal' });
});
router.get('/registro', function(req, res, next) {
  res.render('index', { title: 'Veterinaria', mascota: 'mascota' });
});

module.exports = router;
