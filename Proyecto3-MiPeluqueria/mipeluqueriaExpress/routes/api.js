var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET home page. */
router.get('/servicios', function(req, res, next) {  
  models.servicios.findAll({
    
  })
 .then(servicios => {
    res.json(servicios)
 })
 .catch(error => res.status(400).send(error))


});


router.post('/citas', function(req, res, next) {
   models.citas.create({
      idcitas: req.body.idcitas,
      fecha: req.body.fecha,
      hora: req.body.hora,
      idusuario: req.body.idusuario
   })
   .then(respuesta => {
      res.send(respuesta);
   })
   .catch(error => res.status(400).send(error))
});

module.exports = router;