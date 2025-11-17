/**
 * @swagger
 * tags:
 *   - name: Stack Categories
 *     description: Endpoints para gerenciamento de categorias de stacks
 *
 *   - name: Stacks
 *     description: Endpoints para gerenciamento de stacks
 */


/* ============================================================
   📌 Stack Categories Routes
   ============================================================ */

/**
 * @swagger
 * /stackCategory:
 *   get:
 *     summary: Listar todas as categorias de stacks
 *     tags: ["Stack Categories"]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */

/**
 * @swagger
 * /stackCategory/{id}:
 *   get:
 *     summary: Buscar categoria pelo ID
 *     tags: ["Stack Categories"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria retornada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /stackCategory:
 *   post:
 *     summary: Criar uma nova categoria de stack
 *     tags: ["Stack Categories"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Frontend
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao validar dados
 */

/**
 * @swagger
 * /stackCategory/{id}:
 *   patch:
 *     summary: Atualizar uma categoria existente
 *     tags: ["Stack Categories"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mobile
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /stackCategory/{id}:
 *   delete:
 *     summary: Deletar categoria por ID
 *     tags: ["Stack Categories"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */



/* ============================================================
   📌 Stacks Routes
   ============================================================ */

/**
 * @swagger
 * /stacks:
 *   get:
 *     summary: Listar todas as stacks
 *     tags: ["Stacks"]
 *     responses:
 *       200:
 *         description: Lista carregada com sucesso
 */

/**
 * @swagger
 * /stacks/{id}:
 *   get:
 *     summary: Buscar stack pelo ID
 *     tags: ["Stacks"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da stack
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stack retornada com sucesso
 *       404:
 *         description: Stack não encontrada
 */

/**
 * @swagger
 * /stacks:
 *   post:
 *     summary: Criar uma nova stack
 *     tags: ["Stacks"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da stack
 *                 example: ReactJS
 *               categoryId:
 *                 type: string
 *                 description: ID da categoria associada
 *                 example: 65e4a951c837ebba12345678
 *     responses:
 *       201:
 *         description: Stack criada com sucesso
 *       400:
 *         description: Erro ao validar dados
 */

/**
 * @swagger
 * /stacks/{id}:
 *   patch:
 *     summary: Atualizar uma stack existente
 *     tags: ["Stacks"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da stack
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Next.js
 *               categoryId:
 *                 type: string
 *                 example: 65e4a951c837ebba12345678
 *     responses:
 *       200:
 *         description: Stack atualizada com sucesso
 *       404:
 *         description: Stack não encontrada
 */

/**
 * @swagger
 * /stacks/{id}:
 *   delete:
 *     summary: Deletar stack pelo ID
 *     tags: ["Stacks"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da stack
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stack deletada com sucesso
 *       404:
 *         description: Stack não encontrada
 */
