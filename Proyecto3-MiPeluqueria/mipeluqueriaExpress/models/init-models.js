var DataTypes = require("sequelize").DataTypes;
var _citas = require("./citas");
var _citaservicios = require("./citaservicios");
var _servicios = require("./servicios");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var citas = _citas(sequelize, DataTypes);
  var citaservicios = _citaservicios(sequelize, DataTypes);
  var servicios = _servicios(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  citaservicios.belongsTo(citas, { as: "idcita_cita", foreignKey: "idcita"});
  citas.hasMany(citaservicios, { as: "citaservicios", foreignKey: "idcita"});
  citaservicios.belongsTo(servicios, { as: "idservicio_servicio", foreignKey: "idservicio"});
  servicios.hasMany(citaservicios, { as: "citaservicios", foreignKey: "idservicio"});
  citas.belongsTo(usuarios, { as: "idusuario_usuario", foreignKey: "idusuario"});
  usuarios.hasMany(citas, { as: "cita", foreignKey: "idusuario"});

  return {
    citas,
    citaservicios,
    servicios,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
