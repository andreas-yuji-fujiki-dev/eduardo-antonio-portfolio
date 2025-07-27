/**
 * @swagger
 * tags:
 *   name: Stacks
 *   description: Endpoints para manipulação de stacks
 */

/**
 * @swagger
 * /stacks:
 *   get:
 *     summary: Lista todas as stacks disponíveis
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de stacks retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200 - Success"
 *                 message:
 *                   type: string
 *                   example: "Successfully got all the stacks"
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         $ref: '#/components/schemas/Stack'
 *                     - type: string
 *                       example: "No stacks found..."
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal server error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error has occurred while listing all the stacks"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /stacks/{id}:
 *   get:
 *     summary: Obtém uma stack específica pelo ID
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da stack
 *     responses:
 *       200:
 *         description: Stack encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200 - Success"
 *                 data:
 *                   $ref: '#/components/schemas/Stack'
 *       400:
 *         description: Requisição inválida (ID ausente ou não numérico)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad request"
 *                 message:
 *                   type: string
 *                   example: "You need to provide project's id to search by id"
 *       404:
 *         description: Stack não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not found"
 *                 message:
 *                   type: string
 *                   example: "Cannot find stack with id 999"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Server internal error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error has occurred while getting stack by id"
 */

/**
 * @swagger
 * /stacks:
 *   post:
 *     summary: Cria uma nova stack
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - experience
 *               - logoId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da stack
 *                 example: "React"
 *               experience:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 description: |
 *                   Nível de experiência:
 *                    - 1 = Beginner
 *                    - 2 = Intermediate
 *                    - 3 = Advanced
 *                 example: 2
 *               logoId:
 *                 type: integer
 *                 description: ID da imagem do logo
 *                 example: 5
 *     responses:
 *       201:
 *         description: Stack criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "201 - Created"
 *                 message:
 *                   type: string
 *                   example: "Stack created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Stack'
 *       400:
 *         description: Requisição inválida (validação de campos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad Request"
 *                 message:
 *                   type: string
 *                   example: "The 'experience' field must be present and be one of these: 1 (Beginner), 2 (Intermediate), or 3 (Advanced)."
 *       404:
 *         description: Imagem do logo não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not Found"
 *                 message:
 *                   type: string
 *                   example: "Image with id 999 does not exist."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the stack."
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /stacks/{id}:
 *   put:
 *     summary: Atualiza uma stack existente
 *     description: Todos os campos são opcionais - apenas os campos fornecidos serão atualizados
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da stack a ser atualizada
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 nullable: true
 *                 description: Novo nome da stack
 *                 example: "React Native"
 *               experience:
 *                 type: string
 *                 nullable: true
 *                 description: Novo nível de experiência
 *                 example: "Advanced"
 *               logoId:
 *                 type: integer
 *                 nullable: true
 *                 description: Novo ID da imagem do logo
 *                 example: 7
 *     responses:
 *       200:
 *         description: Stack atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200 - Success"
 *                 message:
 *                   type: string
 *                   example: "Stack updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Stack'
 *       400:
 *         description: Requisição inválida (validação de campos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad Request"
 *                 message:
 *                   type: string
 *                   example: "If provided, 'logoId' must be a valid number."
 *       404:
 *         description: Stack ou imagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not Found"
 *                 message:
 *                   type: string
 *                   example: "Stack with id 999 does not exist."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the stack."
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /stacks/{id}:
 *   delete:
 *     summary: Remove uma stack existente
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da stack a ser removida
 *     responses:
 *       200:
 *         description: Stack removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200 - Success"
 *                 message:
 *                   type: string
 *                   example: "Stack with id 5 deleted successfully."
 *       400:
 *         description: Requisição inválida (ID ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad Request"
 *                 message:
 *                   type: string
 *                   example: "The 'id' parameter must be a valid number."
 *       404:
 *         description: Stack não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not Found"
 *                 message:
 *                   type: string
 *                   example: "Stack with id 999 does not exist."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while deleting the stack."
 *                 error:
 *                   type: object
 */