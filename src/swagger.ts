import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teste tecnico KONSI',
      description: 'Crawler para pegar beneficios pelo cpf',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Url local' }],
    paths: {
      '/benefits': {
        post: {
          summary: 'Pegar beneficios pelo cpf',
          tags: ['Benefits'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/requestBodies/getBenefitsByCpf',
                },
                examples: {
                  getBenefitsByCpf: {
                    value: {
                      cpf: '951.492.370-78',
                      login: 'antonio',
                      password: '123456789',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              $ref: '#/components/responsesBodies/getBenefitsByCpf',
            },
            400: {
              $ref: '#/components/responsesBodies/errors/400',
            },
            404: {
              $ref: '#/components/responsesBodies/errors/404',
            },
            500: {
              $ref: '#/components/responsesBodies/errors/500',
            },
          },
        },
      },
    },
    components: {
      requestBodies: {
        getBenefitsByCpf: {
          type: 'object',
          properties: {
            cpf: {
              type: 'string',
            },
            login: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          required: ['cpf', 'login', 'password'],
        },
      },
      responsesBodies: {
        errors: {
          400: {
            description: 'Bad Request Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Not Found Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        getBenefitsByCpf: {
          description: 'Lista com os numeros dos beneficios',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  benefitsNumbers: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['benefitsNumbers'],
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routs/*.ts'],
}

export const spec = swaggerJsdoc(options)
