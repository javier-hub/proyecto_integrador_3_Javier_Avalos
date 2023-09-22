const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const actores = sequelize.define(
  "Actores",
  {
    idActor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    nombreActor: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    tableName: "actores",
    timestamps: false,
  }
);

module.exports = actores;
