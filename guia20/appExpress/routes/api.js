var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Producto = require('../models').producto; 

/* GET users listing. */
router.get('/productos', function(req, res, next) {
    Producto.findAll({  
        attributes: { exclude: ["updatedAt"] }  
    })     
    .then(resultado => {  
        res.json(resultado)
    })
    .catch(error => res.status(400).send(error)) 
});

router.get('/productos/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    
    Producto.findOne({
        where: {
            [Op.and]: [
                {id: id}
            ]
        }                 
    })
    .then(productos => {  
        res.json( productos );  
    })  
    .catch(error => res.status(400).send(error))
    
});
module.exports = router;