/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para registro e autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria uma conta de usuário com senha criptografada.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *           example:
 *             user: "admin"
 *             password: "admin123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterSuccess'
 *       400:
 *         description: Corpo da requisição inválido ou campos faltando
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingFieldsError'
 *                 - $ref: '#/components/schemas/InvalidTypesError'
 *       409:
 *         description: Conflito - Usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAlreadyExistsError'
 *       500:
 *         description: Erro interno ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário existente
 *     description: Verifica as credenciais e retorna um token JWT válido por 2 horas.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *           example:
 *             user: "admin"
 *             password: "admin123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccess'
 *       400:
 *         description: Requisição inválida ou campos ausentes
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingFieldsError'
 *                 - $ref: '#/components/schemas/InvalidTypesError'
 *       401:
 *         description: Senha incorreta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WrongPasswordError'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundError'
 *       500:
 *         description: Erro interno ao processar login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       required:
 *         - user
 *         - password
 *       properties:
 *         user:
 *           type: string
 *           description: Nome do usuário
 *           example: "admin"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "admin123"
 *
 *     RegisterSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "201 - Created"
 *         message:
 *           type: string
 *           example: "Successfully created the user 'admin'"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "admin"
 *             password:
 *               type: string
 *               example: "$2b$10$hashedPasswordExample"
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
 *
 *     MissingFieldsError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         error:
 *           type: string
 *           example: "Missing fields. You must provide 'user' and 'password', both in string type"
 *
 *     InvalidTypesError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         message:
 *           type: string
 *           example: "The 'user' and 'password' fields must be in string type"
 *
 *     UserAlreadyExistsError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "409 - Conflict"
 *         message:
 *           type: string
 *           example: "User 'admin' already exists"
 *
 *     UserNotFoundError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "404 - Not found"
 *         message:
 *           type: string
 *           example: "User not found"
 *
 *     WrongPasswordError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "401 - Unauthorized"
 *         message:
 *           type: string
 *           example: "Wrong password"
 *
 *     InternalError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "500 - Server internal error"
 *         error:
 *           type: string
 *           example: "Something went wrong"
 *         details:
 *           type: string
 *           example: "JWT_SECRET is not defined"
 */
