const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const personasRoutes = require('./routes/personas.routes');

const app = express();

// Opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tarea Revo - Gestión de Personas',
      version: '1.0.0',
      description: 'API REST para gestionar Personas y sus Canales de Contacto'
    },
    servers: [
      {
        url: 'http://localhost:3001'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Documentación de Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Rutas
app.use('/api', personasRoutes);

module.exports = app;
