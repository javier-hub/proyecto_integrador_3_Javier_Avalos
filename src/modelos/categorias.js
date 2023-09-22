const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection");

const Categorias = sequelize.define(
  "Categorías",
  {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    nombreCategoria: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null,
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  }
);

module.exports = Categorias;
