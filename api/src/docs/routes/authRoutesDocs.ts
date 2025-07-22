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
 *     description: Cria uma nova conta de usuário com senha criptografada
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - password
 *             properties:
 *               user:
 *                 type: string
 *                 description: Nome de usuário único
 *                 example: "novousuario"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário (mínimo 6 caracteres)
 *                 example: "senhasecreta123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "201 - Created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "novousuario"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$hashedpassword..."
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 Bad Request"
 *                     error:
 *                       type: string
 *                       example: "Request body is missing"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     error:
 *                       type: string
 *                       example: "Missing fields. You must provide 'user' and 'password', both in string type."
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "The 'user' and 'password' fields must be in string type."
 *       409:
 *         description: Conflito - Usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "409 - Conflict"
 *                 message:
 *                   type: string
 *                   example: "User novousuario already exists."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Server internal error."
 *                 message:
 *                   type: string
 *                   example: "PrismaClientKnownRequestError: ..."
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário existente
 *     description: Verifica as credenciais e retorna um token JWT válido por 2 horas
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'  # Alterado para usar o schema correto
 *           examples:
 *             example1:
 *               value:
 *                 user: "newuser"
 *                 password: "senhasecreta123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccess'
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingBodyError'
 *                 - $ref: '#/components/schemas/MissingFieldsError'
 *                 - $ref: '#/components/schemas/InvalidTypesError'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginError'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not found."
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal server error."
 *                 message:
 *                   type: string
 *                   example: "Something went wrong."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MissingBodyError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 Bad Request"
 *         error:
 *           type: string
 *           example: "Request body is missing"
 *     
 *     MissingFieldsError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         error:
 *           type: string
 *           example: "Missing fields. You must provide 'user' and 'password', both in string type."
 *     
 *     InvalidTypesError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         message:
 *           type: string
 *           example: "The 'user' and 'password' fields must be in string type."
 */