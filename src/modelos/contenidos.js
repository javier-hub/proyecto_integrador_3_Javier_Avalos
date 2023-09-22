const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const Contenidos = sequelize.define(
  "Contenidos",
  {
    idContenido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    posterContenido: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
    tituloContenido: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resumenContenido: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
    cantidadTemporadas: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
    trailerContenido: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    tableName: "contenidos",
    timestamps: false,
  }
);

module.exports = Contenidos;
