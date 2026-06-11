const { Router } = require('express');
const personasCtrl = require('../controllers/personas.controller');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CanalContacto:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID auto-generado del canal
 *         Nombre:
 *           type: string
 *           description: Nombre del canal (Ej. Correo Electrónico)
 *     Persona:
 *       type: object
 *       required:
 *         - Nombre
 *         - Apellido
 *         - Edad
 *         - Correo
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID auto-generado de la persona
 *         Nombre:
 *           type: string
 *           description: Nombre de la persona
 *         Apellido:
 *           type: string
 *           description: Apellido de la persona
 *         Edad:
 *           type: integer
 *           description: Edad de la persona
 *         Correo:
 *           type: string
 *           description: Correo electrónico de la persona
 *         CanalId:
 *           type: integer
 *           nullable: true
 *           description: ID del canal de contacto preferido
 *         CanalNombre:
 *           type: string
 *           description: Nombre del canal de contacto preferido (Obtenido automáticamente)
 */

/**
 * @swagger
 * tags:
 *   name: Personas
 *   description: Endpoints para gestionar Personas
 * ---
 * tags:
 *   name: Canales
 *   description: Endpoints para gestionar Canales de Contacto
 */

/**
 * @swagger
 * /api/personas/canales-contacto:
 *   get:
 *     summary: Retorna la lista de canales de contacto disponibles
 *     tags: [Canales]
 *     responses:
 *       200:
 *         description: Lista de canales obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CanalContacto'
 */
router.get('/personas/canales-contacto', personasCtrl.getCanalesContacto);

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Retorna la lista de todas las personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de personas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 */
router.get('/personas', personasCtrl.getAll);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Obtiene una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       404:
 *         description: Persona no encontrada
 */
router.get('/personas/:id', personasCtrl.getById);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Crea una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 */
router.post('/personas', personasCtrl.create);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Actualiza los datos de una persona existente
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la persona a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       404:
 *         description: Persona no encontrada
 */
router.put('/personas/:id', personasCtrl.update);

/**
 * @swagger
 * /api/personas/{id}:
 *   delete:
 *     summary: Elimina una persona por su ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/personas/:id', personasCtrl.delete);

module.exports = router;
