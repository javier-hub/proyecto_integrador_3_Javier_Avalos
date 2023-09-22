const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const contenidoGénero = sequelize.define(
  "contenidoGénero",
  {
    idContenidoGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    idContenido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idGenero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "contenidogenero",
    timestamps: false,
  }
);

module.exports = contenidoGénero;
