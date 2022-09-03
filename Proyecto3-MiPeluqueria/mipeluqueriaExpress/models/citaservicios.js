const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('citaservicios', {
    idcitaServicios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idcita: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'citas',
        key: 'idcitas'
      }
    },
    idservicio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'servicios',
        key: 'idservicios'
      }
    }
  }, {
    sequelize,
    tableName: 'citaservicios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcitaServicios" },
        ]
      },
      {
        name: "idcita_idx",
        using: "BTREE",
        fields: [
          { name: "idcita" },
        ]
      },
      {
        name: "idservicio_idx",
        using: "BTREE",
        fields: [
          { name: "idservicio" },
        ]
      },
    ]
  });
};
