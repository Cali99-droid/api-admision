import swaggerJSDoc from "swagger-jsdoc";

/**
 * API Config Info
 */

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "DOCS API ADMISION COLEGIO AE",
    version: "1.0.1",
  },
  servers: [
    {
      url: "http://api.dev-solware.com/api",
    },
    {
      url: "http://localhost:3001/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      authLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      authRegister: {
        type: "object",
        required: [
          "name",
          "lastname",
          "surname",
          "doc_number",
          "email",
          "phone",
        ],
        properties: {
          name: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          surname: {
            type: "string",
          },
          doc_number: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
        },
      },
      authConfirm: {
        type: "object",
        required: ["token", "password"],
        properties: {
          token: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
  },
};

/**
 * Opciones
 */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfigration = swaggerJSDoc(options);

export default openApiConfigration;
