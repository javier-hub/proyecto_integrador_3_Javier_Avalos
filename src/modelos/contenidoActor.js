const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const contenidoActor = sequelize.define(
  "contenidoActor",
  {
    idContenidoActor: {
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
    idActor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "contenidogenero",
    timestamps: false,
  }
);

module.exports = contenidoActor;
