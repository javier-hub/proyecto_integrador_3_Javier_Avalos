const express = require("express");
const app = express();

const sequelize = require("./src/conexion/connection");
const Actores = require("./src/modelos/actores");
const Catalogo = require("./src/modelos/catalogo");
const Categorias = require("./src/modelos/categorias");
const contenidoActor = require("./src/modelos/contenidoActor");
const contenidoGenero = require("./src/modelos/contenidoGenero");
const Contenidos = require("./src/modelos/contenidos");
const Generos = require("./src/modelos/generos");

const { Op } = require("sequelize");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();

    await Actores.sync();
    await Catalogo.sync();
    await Categorias.sync();
    await contenidoActor.sync();
    await contenidoGenero.sync();
    await Contenidos.sync();
    await Generos.sync();

    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/categorias", async (req, res) => {
  try {
    const allCategories = await Categorias.findAll();

    allCategories.length !== 0
      ? res.status(200).json(allCategories)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/catalogo", async (req, res) => {
  try {
    const allCatalogue = await Catalogo.findAll();

    const response = {
      results: [...allCatalogue],
      info: {
        dateOfQuery: new Date(),
        totalRecords: allCatalogue.length || 0,
        database: sequelize.getDatabaseName(),
      },
    };

    allCatalogue.length !== 0
      ? res.status(200).json(response)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/catalogo/buscar/id/:idCatalogo", async (req, res) => {
  try {
    const { idCatalogo } = req.params;
    const oneCatalogue = await Catalogo.findByPk(idCatalogo);

    oneCatalogue.length !== 0
      ? res.status(200).json(oneCatalogue)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/catalogo/buscar/nombre/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const tituloContenido = await Catalogo.findOne({
      where: {
        titulo: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });

    tituloContenido.length !== 0
      ? res.status(200).json(tituloContenido)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/catalogo/buscar/genero/:genero", async (req, res) => {
  try {
    /*
    const { genero } = req.params;
    const generoCatalogue = await Catalogo.findAll({
      where: { genero },
    });
    */

    const { genero } = req.params;
    const generoCatalogue = await Catalogo.findAll({
      where: {
        genero: {
          [Op.like]: `%${genero}%`,
        },
      },
    });

    generoCatalogue.length !== 0
      ? res.status(200).json(generoCatalogue)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.get("/catalogo/buscar/categoria/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params;
    const categorieCatalogue = await Catalogo.findAll({
      where: { categoria },
    });

    categorieCatalogue.length !== 0
      ? res.status(200).json(categorieCatalogue)
      : res
          .status(404)
          .json({ error: "No se encuentran recursos para listar." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

app.use("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`
    );
});

app.listen(port, () =>
  console.log(`Servidor escuchando en el puerto: ${port}`)
);
