/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos com suas imagens e stacks
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *             examples:
 *               withProjects:
 *                 value:
 *                   status: "200 - Success"
 *                   data:
 *                     - id: 1
 *                       name: "Meu Projeto"
 *                       description: "Descrição detalhada"
 *                       more_info: "Info adicional"
 *                       deploy_link: "https://meuprojeto.com"
 *                       repository_link: "https://github.com/meuprojeto"
 *                       images:
 *                         - id: 1
 *                           name: "screenshot.png"
 *                       stacks:
 *                         - stack:
 *                             id: 1
 *                             name: "React"
 *               noProjects:
 *                 value:
 *                   status: "200 - Success"
 *                   data: "No projects found..."
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
 *                   example: "Something went wrong while fetching projects"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtém um projeto específico pelo ID
 *     description: Retorna o projeto com todas as suas imagens e stacks relacionadas
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200 - Success"
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Project'
 *                     - type: string
 *                       example: "Not found..."
 *       400:
 *         description: ID inválido ou ausente
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
 *                   example: "Missing a valid project's ID"
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
 *                   example: "PrismaClientKnownRequestError: ..."
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
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
 *               - name
 *               - description
 *               - more_info
 *               - deploy_link
 *               - repository_link
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome único do projeto
 *                 example: "Meu Projeto Incrível"
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do projeto
 *                 example: "Um projeto feito com React e Node.js"
 *               more_info:
 *                 type: string
 *                 description: Informações adicionais sobre o projeto
 *                 example: "Projeto desenvolvido durante o curso X"
 *               deploy_link:
 *                 type: string
 *                 format: uri
 *                 description: URL de deploy do projeto
 *                 example: "https://meuprojeto.com"
 *               repository_link:
 *                 type: string
 *                 format: uri
 *                 description: URL do repositório do projeto
 *                 example: "https://github.com/meuprojeto"
 *               imageIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs das imagens associadas ao projeto
 *                 example: [1, 2, 3]
 *               stackIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs das stacks associadas ao projeto
 *                 example: [4, 5, 6]
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
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
 *                   example: "Project created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       409:
 *         description: Conflito - Nome de projeto já existe
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
 *                   example: "A project with this name already exists"
 *       422:
 *         description: Entidade não processável - Campos obrigatórios faltando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "422 - Unprocessable Entity"
 *                 error:
 *                   type: string
 *                   example: "Some required field is missing, make sure that you have informed these: name, description, more_info, deploy_link, repository_link"
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
 *                   example: "Error while registering new project"
 *                 error:
 *                   type: string
 *                   example: "PrismaClientValidationError: .."
 */

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto existente
 *     description: |
 *       Atualiza parcialmente um projeto. Todos os campos são opcionais.
 *       - Para images/stacks: 
 *         - Envie um array vazio para remover todas as associações
 *         - Envie null para manter as associações existentes
 *         - Envie novos arrays para substituir as associações
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto a ser atualizado
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
 *                 example: "Novo Nome do Projeto"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Nova descrição detalhada"
 *               more_info:
 *                 type: string
 *                 nullable: true
 *                 example: "Novas informações adicionais"
 *               deploy_link:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 example: "https://novo-deploy.com"
 *               repository_link:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 example: "https://github.com/novo-repositorio"
 *               imageIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 nullable: true
 *                 example: [1, 2, 3]
 *               stackIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 nullable: true
 *                 example: [4, 5]
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
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
 *                   example: "Project updated successfully"
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: |
 *           Requisição inválida. Possíveis causas:
 *           - ID inválido
 *           - Nenhum campo fornecido para atualização
 *           - Tipos de campos inválidos
 *           - IDs de imagens/stacks inexistentes
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad Request"
 *                     message:
 *                       type: string
 *                       example: "Project ID must be a valid number"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400"
 *                     message:
 *                       type: string
 *                       example: "'name' must be a string"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad Request"
 *                     message:
 *                       type: string
 *                       example: "Some image IDs do not exists"
 *       404:
 *         description: Projeto não encontrado
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
 *                   example: "Project not found"
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
 *                   example: "Error while updating project"
 *                 error:
 *                   type: string
 *                   example: "PrismaClientKnownRequestError: ..."
 */

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Remove um projeto existente
 *     description: Exclui permanentemente um projeto e todas as suas associações
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do projeto a ser removido
 *     responses:
 *       200:
 *         description: Projeto removido com sucesso
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
 *                   example: "Successfully deleted the project with id 5"
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
 *                   example: "Missing a valid project's ID"
 *       404:
 *         description: Projeto não encontrado
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
 *                   example: "Project with id 999 does not exists"
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
 *                   example: "PrismaClientKnownRequestError: ..."
 */