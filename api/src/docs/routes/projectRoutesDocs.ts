/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Endpoints relacionados aos projetos
 *   - name: Project Categories
 *     description: Endpoints para gerenciamento de categorias de projetos
 */

/**
 * @swagger
 * /projectCategory:
 *   post:
 *     summary: Criar nova categoria de projeto
 *     tags: [Project Categories]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Web Development
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Campos inválidos ou já existentes.
 *       401:
 *         description: Token não fornecido ou inválido.
 */

/**
 * @swagger
 * /projectCategory:
 *   get:
 *     summary: Listar todas as categorias de projetos
 *     tags: [Project Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 */

/**
 * @swagger
 * /projectCategory/{id}:
 *   get:
 *     summary: Buscar uma categoria específica pelo ID
 *     tags: [Project Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria encontrada.
 *       404:
 *         description: Categoria não encontrada.
 */

/**
 * @swagger
 * /projectCategory/{id}:
 *   patch:
 *     summary: Atualizar uma categoria existente
 *     tags: [Project Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */

/**
 * @swagger
 * /projectCategory/{id}:
 *   delete:
 *     summary: Excluir uma categoria de projeto
 *     tags: [Project Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */


/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Criar um novo projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meu Portfolio
 *               description:
 *                 type: string
 *                 example: Um website pessoal responsivo feito em Next.js
 *               categoryId:
 *                 type: string
 *                 example: 42jf82h0-fdf9-455b-9c21-fe09123
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Listar todos os projetos
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso.
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Buscar um projeto pelo ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto encontrado.
 *       404:
 *         description: Projeto não encontrado.
 */

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Atualizar informações de um projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso.
 *       404:
 *         description: Projeto não encontrado.
 */

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Excluir um projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto excluído com sucesso.
 *       404:
 *         description: Projeto não encontrado.
 */
