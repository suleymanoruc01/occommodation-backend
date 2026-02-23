// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Accommodation API",
      version: "1.0.0",
      description:
        "Accommodation rezervasyon sistemi için RESTful API dokümantasyonu",
    },
    servers: [
      {
        url: "https://kirtepan-backend-5f2b71eaf03c.herokuapp.com/", // Gerekirse güncelle
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*"], // Route dosyalarınızın yolu
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
