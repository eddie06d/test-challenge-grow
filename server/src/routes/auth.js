const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Inicia sesión de un usuario y obtiene un token JWT
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso y devuelve un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Error del servidor
*/
router.post('/signup', async(req, res, next) => {
    const { correo, contrasena } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { correo },
    });

    if (!user) {
      return res.json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      return res.json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    delete user.contrasena;

    const token = jwt.sign({ userId: user.id, tipo_usuario: user.tipo_usuario }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;