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
      url: "http://localhost:3001/api",
    },
    {
      url: "https://api.dev-solware.com/api",
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
          "mLastname",
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
          mLastname: {
            type: "string",
          },
          doc_number: {
            type: "integer",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "integer",
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
      authForgot: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
          },
        },
      },
      family: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
        },
      },

      spouse: {
        type: "object",
        properties: {
          userData: {
            type: "object",
            required: ["email", "phone"],
            properties: {
              email: {
                type: "string",
                example: "otraespo2@gmail.com",
              },
              phone: {
                type: "integer",
                format: "int64",
                example: 990170959,
              },
            },
          },
          person: {
            type: "object",
            required: [
              "name",
              "lastname",
              "mLastname",
              "type_doc",
              "doc_number",
              "profession",
              "birthdate",
            ],
            properties: {
              name: {
                type: "string",
                example: "Julia",
              },
              lastname: {
                type: "string",
                example: "Flores",
              },
              mLastname: {
                type: "string",
                example: "Flores",
              },
              type_doc: {
                type: "string",
                example: "DNI o CE",
              },
              doc_number: {
                type: "integer",
                example: 95848745,
              },
              profession: {
                type: "string",
                example: "doctor",
              },
              birthdate: {
                type: "string",
                format: "date",
                example: "2021-04-10",
              },
              img1: {
                type: "string",
                format: "binary",
              },
              img2: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
      },
      region: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
      },
      province: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
      },
      district: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
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
