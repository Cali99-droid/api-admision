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
      url: "https://api-admision.dev-solware.com/api",
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
      summaryEvaluation: {
        type: "array",
        items: {
          type: "object",
          properties: {
            campus: {
              type: "string",
            },
            level: {
              type: "string",
            },
            grade: {
              type: "string",
            },
            notAssigned: {
              type: "number",
            },
            notNecessary: {
              type: "number",
            },
            served: {
              type: "number",
            },
            noServed: {
              type: "number",
            },
          },
        },
      },
      backgroundSummarySecretary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            campus: {
              type: "string",
            },
            level: {
              type: "string",
            },
            grade: {
              type: "string",
            },
            notAssigned: {
              type: "number",
            },
            served: {
              type: "number",
            },
            noServed: {
              type: "number",
            },
          },
        },
      },
      backgroundSummary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            campus: {
              type: "string",
            },
            level: {
              type: "string",
            },
            grade: {
              type: "string",
            },
            notAssigned: {
              type: "number",
            },
            served: {
              type: "number",
            },
            noServed: {
              type: "number",
            },
          },
        },
      },
      summaryOfApplicantsBySecretary: {
        type: "object",
        properties: {
          campus: {
            type: "string",
          },
          level: {
            type: "string",
          },
          grade: {
            type: "string",
          },
          noServed: {
            type: "number",
          },
          served: {
            type: "number",
          },
        },
      },

      roles: {
        type: "array",
        items: {
          type: "object",
          properties: {

            id: {
              type: "number",
            },
            rol: {
              type: "string",
            },
          },
        },
      },
      role: {
        type: "object",
        required: ["rol"],
        properties: {
          rol: {
            type: "string",
          },
        },
      },

      rolePermissions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            roles_id: {
              type: "number",
            },
            permissions_id: {
              type: "number",
            },

          },
        },

      },
      rolePermission: {
        type: "object",
        required: ["roles_id", "permissions_id"],
        properties: {
          roles_id: {
            type: "number",
          },
          permissions_id: {
            type: "number",
          },
        },
      },
      userRole: {
        type: "object",
        required: ["roles_id", "status"],
        properties: {
          user_id: {
            type: "number",
          },
          roles_id: {
            type: "number",
          },
          status: {
            type: "number",
          },
          token_boss: {
            type: "string",
          },
          permissions: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      users: {
        type: "array",
        
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            doc_number: {
              type: "string",
            },
            name: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            mLastname: {
              type: "string",
            },
            date: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            create_time: {
              type: "string",
              format: "date-time",
            },
            mautic: {
              type: "number",
            },
            user_roles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                  },
                  roles: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      rol: {
                        type: "string",
                      },
                    },
                  },
                  create_time: {
                    type: "string",
                  },
                  update_time: {
                    type: "string",
                    format: "nullable",
                  },
                },
              },
            },
          
        },
      },
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
          "role",
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
          role: {
            type: "string",
            example: "P O M",
          },
          doc_number: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "integer",
          },
          status_polit: {
            type: "string",
            example: true,
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
      home: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          address: {
            type: "string",
          },
          reference: {
            type: "string",
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
              province_id: {
                type: "string",
              },
            },
          },
          doc: {
            type: "string",
          },
        },
      },
      range: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
        },
      },
      spouseUpd: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
          },
          data: {
            type: "object",
            properties: {
              personUpdate: {
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
                    type: "string",
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
                  user: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                      },
                      phone: {
                        type: "string",
                      },
                    },
                  },
                },
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
      incomeUpd: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
          },
          data: {
            type: "object",
            properties: {
              incomeUpdate: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                  },
                  range_id: {
                    type: "integer",
                  },
                  family_id: {
                    type: "integer",
                  },
                },
              },
              images: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
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
