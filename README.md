# Documentación del Código

Este documento proporciona una visión general del código de una aplicación Express que se conecta a una base de datos utilizando Sequelize y ofrece endpoints para acceder a información de un catálogo de contenidos multimedia.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes dependencias:

- Nodemon
- Dotenv
- Express
- Sequelize
- Mysql2 (conexión configurada en el archivo `src/conexion/connection.js`).

## Configuración

1. Clona este repositorio.
2. Instala las dependencias ejecutando `npm install`.
3. Configura la conexión a la base de datos en `src/conexion/connection.js`.

## Archivo .env (variables de entorno)

- DB_SCHEMA = nombre de la base de datos
- DB_USER = nombre de usuario
- DB_PASSWORD = contraseña
- DB_HOST = dirección del host
- DB_PORT = puerto de la base de datos
- PORT = puerto donde escucha la app

## Uso

1. Inicia la aplicación con `npm start`.
2. La aplicación se ejecutará en el puerto 3000 por defecto, o en el puerto especificado en la variable de entorno `PORT`.

## Endpoints

### GET /categorias

- Descripción: Obtiene todas las categorías de contenidos disponibles en la base de datos.
- Respuesta exitosa: Código de estado 200 con un array de categorías.
- Respuesta de error: Código de estado 404 si no se encuentran recursos o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### GET /catalogo

- Descripción: Obtiene todos los registros del catálogo de contenidos.
- Respuesta exitosa: Código de estado 200 con un objeto JSON que contiene los resultados, información de la consulta y el nombre de la base de datos.
- Respuesta de error: Código de estado 404 si no se encuentran recursos o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### GET /catalogo/buscar/id/:idCatalogo

- Descripción: Busca un contenido en el catálogo por su ID.
- Respuesta exitosa: Código de estado 200 con un objeto JSON que contiene el contenido encontrado.
- Respuesta de error: Código de estado 404 si no se encuentra el recurso o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### GET /catalogo/buscar/nombre/:nombre

- Descripción: Busca contenidos en el catálogo por su título (parcial o completo).
- Respuesta exitosa: Código de estado 200 con un objeto JSON que contiene el contenido encontrado.
- Respuesta de error: Código de estado 404 si no se encuentran recursos o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### GET /catalogo/buscar/genero/:genero

- Descripción: Busca contenidos en el catálogo por género.
- Respuesta exitosa: Código de estado 200 con un array de contenidos que pertenecen al género especificado.
- Respuesta de error: Código de estado 404 si no se encuentran recursos o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### GET /catalogo/buscar/categoria/:categoria

- Descripción: Busca contenidos en el catálogo por categoría.
- Respuesta exitosa: Código de estado 200 con un array de contenidos que pertenecen a la categoría especificada.
- Respuesta de error: Código de estado 404 si no se encuentran recursos o código de estado 500 en caso de error en el servidor.
- Código:

```
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
```

### Otros Endpoints

- La aplicación también responde con un error 404 para rutas que no existen en la aplicación.
- Código:

```
app.use("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`
    );
});
```

## Notas Adicionales

- La autenticación con la base de datos se realiza al inicio de la aplicación.
- Los modelos de la base de datos se sincronizan al inicio de la aplicación.
- Asegúrate de configurar la base de datos y tener datos en ella para probar los endpoints correctamente.

¡Disfruta utilizando esta aplicación Express!
