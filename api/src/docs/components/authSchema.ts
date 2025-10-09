/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - user
 *         - password
 *       properties:
 *         user:
 *           type: string
 *           example: "usuario_existente"
 *         password:
 *           type: string
 *           format: password
 *           example: "senha123"
 * 
 *     LoginSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         message:
 *           type: string
 *           example: "You have successfully logged in"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "401 - Unauthorized"
 *         message:
 *           type: string
 *           example: "Wrong password"
 *       example:
 *         status: "401 - Unauthorized"
 *         message: "Credenciais inválidas"
 */