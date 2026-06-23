const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MeVocatio API Documentation",
      version: "1.0.0",
      description: "Documentación de la API para la plataforma de orientación vocacional MeVocatio",
    },
    servers: [
      { url: "http://localhost:3001" }, // tu backend corre en el puerto 3001, no 5000
    ],
  },
  apis: ["./src/routes/*.js"], // ojo: tus rutas están en src/routes, no en routes/
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };