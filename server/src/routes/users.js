const router = require('express').Router();
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - usuario
 *         - correo
 *         - apell_paterno
 *         - apell_materno
 *         - nombre
 *         - tipo_usuario
 *         - contrasena
 *       properties:
 *         id:
 *           type: integer
 *           description: El id del usuario
 *         usuario:
 *            type: string
 *            description: El username del usuario
 *         correo: 
 *            type: string
 *            description: El correo del usuario
 *         apell_paterno:
 *            type: string
 *            description: El apellido paterno del usuario
 *         apell_materno:
 *            type: string
 *            description: El apellido materno del usuario
 *         nombre:
 *           type: string
 *           description: El nombre del usuario
 *         tipo_usuario:
 *            type: string
 *            description: El tipo de usuario
 *         contrasena:
 *            type: string
 *            description: La contraseña del usuario
 *         created_at:
 *             type: string
 *             description: La fecha de creacion del usuario
 *         updated_at:
 *             type: string
 *             description: La fecha de actualizacion del usuario
 *       example:
 *          id: 1,
 *          usuario: eddie06,
 *          correo: eddie_06@gmail.com,
 *          nombre: Eddie,
 *          apell_paterno: Huancahuire,
 *          apell_materno: Velasquez,
 *          contrasena: 123456,
 *          tipo_usuario: user,
 *          created_at: 2024-11-12T00:16:25.975Z,
 *          updated_at: 2024-11-12T00:16:25.975Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users with pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of users per page
 *     responses:
 *       200:
 *         description: The list of the users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number
 *                     limit:
 *                       type: integer
 *                       description: The number of items per page
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages
 *                     totalUsers:
 *                       type: integer
 *                       description: The total number of users
 */
router.get('/', authMiddleware, async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const users = await prisma.user.findMany({
            skip: offset,
            take: limit,
            select: {
                id: true,
                usuario: true,
                correo: true,
                nombre: true,
                apell_paterno: true,
                apell_materno: true,
                tipo_usuario: true,
                created_at: true,
                updated_at: true,
            },
        });

        const totalUsers = await prisma.user.count();
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            success: true,
            data: users,
            pagination: {
                currentPage: page,
                totalPages,
                totalUsers,
                limit
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a User by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 */
router.get('/:id', authMiddleware, async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
          success: false,
          message: 'No id was provided'
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if(user) delete user.contrasena;

        user ? 
            res.status(200).json({
                success: true,
                data: user
            }) :
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', async(req, res) => {
    const body = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(body.contrasena, 10);
  
      const newUser = await prisma.user.create({
        data: {
          ...body,
          contrasena: hashedPassword,
        },
      });
  
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a User by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 */
router.put('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
          success: false,
          message: 'No id was provided'
        });
    }

    const body = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: body,
      });

      delete updatedUser.contrasena;

      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the User by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
          success: false,
          message: 'No id was provided'
        });
    }

    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
});

module.exports = router;