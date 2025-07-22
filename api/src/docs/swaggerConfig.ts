import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Portfolio's API",
      version: '1.0.0',
      description: "Portfolio's API Documentation",
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: [
    path.join(__dirname, 'routes/*.ts'),
    path.join(__dirname, 'components/*.ts'),
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);