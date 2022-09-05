var express = require('express');
const citas = require('../models/citas.js');
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
   let citas = {
      idcitas: req.body.idcitas,
      fecha: req.body.fecha,
      hora: req.body.hora,
      idusuario: req.body.idusuario
   };
   
   models.citas.create(citas)
   .then(cita => {
      res.send({resultado: true, mensaje: 'Registro guardado', cita: cita});
    })
});

/* router.post('/citaservicios', function(req, res, next) {
   let servicios = {
      idcitaServicios: req.body.idcitaServicios,
      idcita: req.body.idcita,
      idservicio: req.body.idservicio
   };
   
   models.citaservicios.create(servicios)
   .then(cs => {
      res.send({resultado: true, mensaje: 'Registro guardado', citaservicios: cs});
   })
}); */

module.exports = router;