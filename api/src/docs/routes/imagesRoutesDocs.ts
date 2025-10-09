/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Endpoints para gerenciamento de imagens
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lista todas as imagens
 *     description: Retorna todas as imagens cadastradas no sistema com informações básicas
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de imagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageResponse'
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
 *                   example: "An error occurred while trying to list all images"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Obtém uma imagem específica pelo ID
 *     description: Retorna os detalhes de uma imagem incluindo sua relação com stack (se existir)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da imagem
 *     responses:
 *       200:
 *         description: Imagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageByIdResponse'
 *       400:
 *         description: ID inválido ou ausente
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
 *                   example: "You need to give an valid project's id on request params"
 *       404:
 *         description: Imagem não encontrada
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
 *                   example: "Project with id 999 was not found..."
 *       500:
 *         description: Erro interno do servidor
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
 *                   example: "An error occurred while searching for image by id"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Cria uma nova imagem
 *     description: Registra uma nova imagem no sistema (nome deve ser único)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageCreateRequest'
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageCreateResponse'
 *       400:
 *         description: Requisição inválida
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
 *                   example: "You must send image's name in string format"
 *       409:
 *         description: Conflito - Nome de imagem já existe
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
 *                   example: "A image with this name already exists"
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
 *                   example: "An unexpected error occurred while creating a new image"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Atualiza uma imagem existente
 *     description: Atualiza o nome de uma imagem (o nome deve permanecer único no sistema)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da imagem a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageUpdateRequest'
 *     responses:
 *       200:
 *         description: Imagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUpdateResponse'
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
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "You must send a valid image's id on request params"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "You must send image's name in string format to be updated"
 *       404:
 *         description: Imagem não encontrada
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
 *                   example: "Project with id 999 was not found..."
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
 *                   example: "An unexpected error occurred while updating the image"
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Remove uma imagem permanentemente
 *     description: |
 *       Exclui uma imagem do sistema.
 *       Atenção: Esta operação é irreversível e pode afetar stacks/projetos associados.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da imagem a ser removida
 *     responses:
 *       200:
 *         description: Imagem removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageDeleteResponse'
 *       400:
 *         description: ID inválido ou ausente
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
 *                   example: "You must provide a valid image's id on request params"
 *       404:
 *         description: Imagem não encontrada
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
 *                   example: "Project with id 999 was not found..."
 *       500:
 *         description: Erro interno do servidor
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
 *                   example: "An unexpected error has occurred while deleting the image"
 *                 error:
 *                   type: object
 */