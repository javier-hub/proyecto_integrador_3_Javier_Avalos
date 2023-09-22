const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const catalogo = sequelize.define(
  "Catalogo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    poster: {
      type: DataTypes.STRING,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    categoria: {
      type: DataTypes.STRING,
    },
    genero: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
    temporadas: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
    reparto: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    tableName: "catalogo",
    timestamps: false,
  }
);

module.exports = catalogo;
