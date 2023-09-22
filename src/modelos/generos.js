const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const Géneros = sequelize.define(
  "Géneros",
  {
    idGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    nombreGenero: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    tableName: "géneros",
    timestamps: false,
  }
);

module.exports = Géneros;
