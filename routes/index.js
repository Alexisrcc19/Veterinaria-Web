var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Veterinaria', lugar: 'principal' });
});

module.exports = router;
