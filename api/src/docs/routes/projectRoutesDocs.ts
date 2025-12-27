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
 *     summary: Lista todas as categorias de projetos com paginação
 *     description: |
 *       Retorna todas as categorias de projetos paginadas.
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Project Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página (começa em 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         description: Quantidade de itens por página (padrão 5)
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
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
 *                   example: "Successfully got all the project categories"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 2
 *                     totalItens:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         description: Todos os campos do modelo ProjectCategory
 *                     - type: string
 *                       example: "No project categories found..."
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: ..."
 */

/**
 * @swagger
 * /projectCategory/search:
 *   get:
 *     summary: Busca categorias de projetos por nome
 *     description: |
 *       Busca categorias de projetos que contenham o termo pesquisado no campo 'name'.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       A busca é case-insensitive e inclui a relação completa com projetos.
 *     tags: [Project Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Termo de busca no campo 'name' (obrigatório)
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
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
 *                   example: "Successfully searched"
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Web Development"
 *                           projects:
 *                             type: array
 *                             description: Todos os projetos relacionados com todos os campos
 *                             items:
 *                               type: object
 *                     - type: string
 *                       example: "Nothing found..."
 *       400:
 *         description: Parâmetro de busca inválido ou faltando
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
 *                   example: "'query' must be a non-empty string"
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: Database connection failed"
 */

/**
 * @swagger
 * /projectCategory/{id}:
 *   put:
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
 * /projectCategory/{id}:
 *   get:
 *     summary: Busca uma categoria de projeto específica pelo ID
 *     description: |
 *       Retorna uma categoria de projeto específica pelo ID com TODOS os campos do modelo.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Project Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da categoria de projeto (≥1, inteiro, positivo)
 *     responses:
 *       200:
 *         description: Categoria encontrada e retornada com sucesso
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
 *                   example: "Successfully got project category with id '1'"
 *                 data:
 *                   type: object
 *                   description: Todos os campos do modelo ProjectCategory
 *       400:
 *         description: ID inválido (retornado pelo validateId do middleware)
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
 *                   example: "'id' must be a valid integer and positive number"
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Categoria não encontrada com o ID especificado
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
 *                   example: "Cannot find project category with id '999'"
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: ..."
 */

 /** @swagger
 * /projects:
 *   post:
 *     summary: Registra um novo projeto
 *     description: Cria um novo projeto com relações (imagens, stacks e categoria) e retorna o projeto criado.
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
 *                 minLength: 1
 *                 example: "Meu Projeto Incrível"
 *                 description: Nome único do projeto
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 example: "Uma descrição detalhada do projeto"
 *               more_info:
 *                 type: string
 *                 minLength: 1
 *                 example: "Informações adicionais sobre o projeto"
 *               deploy_link:
 *                 type: string
 *                 minLength: 1
 *                 example: "https://meuprojeto.com"
 *               repository_link:
 *                 type: string
 *                 minLength: 1
 *                 example: "https://github.com/usuario/projeto"
 *               imageIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [1, 2, 3]
 *                 description: IDs das imagens existentes a serem vinculadas
 *               stackIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 example: [1, 2, 3]
 *                 description: IDs das stacks/tecnologias existentes
 *               categoryId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *                 description: ID da categoria de projeto existente
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso pelo controller.
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Meu Projeto Incrível"
 *                     description:
 *                       type: string
 *                       example: "Uma descrição detalhada do projeto"
 *                     more_info:
 *                       type: string
 *                       example: "Informações adicionais sobre o projeto"
 *                     deploy_link:
 *                       type: string
 *                       example: "https://meuprojeto.com"
 *                     repository_link:
 *                       type: string
 *                       example: "https://github.com/usuario/projeto"
 *                     category:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Web Development"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           url:
 *                             type: string
 *                             example: "https://example.com/image.jpg"
 *                           alt_text:
 *                             type: string
 *                             example: "Descrição da imagem"
 *                     stacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           stack:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "React"
 *                               description:
 *                                 type: string
 *                                 example: "Biblioteca JavaScript para UI"
 *       400:
 *         description: Erro de validação do middleware (campos obrigatórios faltando ou inválidos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad request"
 *                 error:
 *                   type: string
 *                   example: "Missing required field(s): name, description"
 *                 hint:
 *                   type: string
 *                   example: "Required: 'name', 'description', 'more_info', 'deploy_link', 'repository_link'. Optional: 'imageIds', 'stackIds', 'categoryId'"
 *       404:
 *         description: IDs de imagens, stacks ou categoria não encontrados no banco.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "The following image IDs do not exist: 5, 6, 7"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "The following stack IDs do not exist: 8, 9, 10"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "Project category with id '15' does not exist"
 *       409:
 *         description: Nome do projeto já existe no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "409 - Conflict"
 *                     message:
 *                       type: string
 *                       example: "A project already exists with the name 'Meu Projeto Incrível'"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "409 - Conflict"
 *                     message:
 *                       type: string
 *                       example: "A project with the name 'Meu Projeto Incrível' already exists"
 *       500:
 *         description: Erro interno do servidor no middleware ou controller.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal server error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error occurred"
 *                     details:
 *                       type: string
 *                       example: "Prisma error: ..."
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal server error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error ocurred"
 *                     details:
 *                       type: string
 *                       example: "Prisma error: ..."
 */

/**
 * @swagger
 * /projects/search:
 *   get:
 *     summary: Busca projetos por termo
 *     description: |
 *       Busca projetos que contenham o termo pesquisado em qualquer um destes campos:
 *       - name, description, more_info, repository_link, deploy_link
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       A busca é case-insensitive e retorna TODOS os campos das relações.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Termo de busca (obrigatório)
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
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
 *                   example: "Successfully searched"
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Meu Projeto"
 *                           description:
 *                             type: string
 *                             example: "Descrição do projeto"
 *                           more_info:
 *                             type: string
 *                             example: "Informações adicionais"
 *                           deploy_link:
 *                             type: string
 *                             example: "https://meuprojeto.com"
 *                           repository_link:
 *                             type: string
 *                             example: "https://github.com/usuario/projeto"
 *                           category:
 *                             type: object
 *                             description: Todos os campos da categoria
 *                           images:
 *                             type: array
 *                             description: Todas as imagens com todos os campos
 *                             items:
 *                               type: object
 *                           stacks:
 *                             type: array
 *                             description: Todas as stacks com todos os campos (incluindo relação)
 *                             items:
 *                               type: object
 *                     - type: string
 *                       example: "Nothing found..."
 *       400:
 *         description: Parâmetro de busca inválido ou faltando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad request"
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameter"
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: Database connection failed"
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Busca um projeto específico pelo ID
 *     description: |
 *       Retorna um projeto específico pelo ID com todas as suas relações.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.

 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico do projeto (deve ser ≥ 1)
 *     responses:
 *       200:
 *         description: Projeto encontrado e retornado com sucesso
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
 *                   example: "Successfully got the project with id '1'"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Meu Projeto Incrível"
 *                     description:
 *                       type: string
 *                       example: "Descrição do projeto"
 *                     more_info:
 *                       type: string
 *                       example: "Informações adicionais"
 *                     deploy_link:
 *                       type: string
 *                       example: "https://meuprojeto.com"
 *                     repository_link:
 *                       type: string
 *                       example: "https://github.com/usuario/projeto"
 *                     category:
 *                       type: object
 *                       description: Todos os campos da categoria do projeto
 *                     images:
 *                       type: array
 *                       description: Todas as imagens com TODOS os campos
 *                       items:
 *                         type: object
 *                     stacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           stack:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "React"
 *                               experience:
 *                                 type: string
 *                                 example: "2 (Intermediate)"
 *                               category:
 *                                 type: object
 *                                 description: Todos os campos da categoria da stack
 *                               logo:
 *                                 type: string
 *                                 example: "react-logo.png"
 *       400:
 *         description: ID inválido (retornado pelo validateId do middleware)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "400 - Bad request"
 *                 error:
 *                   type: string
 *                   example: "Invalid id parameter"
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Projeto não encontrado com o ID especificado
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
 *                   example: "Cannot find the project with id '999'"
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: ..."
 */

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto existente
 *     description: |
 *       Atualiza um projeto existente pelo ID. Todos os campos são opcionais.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico do projeto (≥1, inteiro, positivo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 nullable: true
 *                 minLength: 1
 *                 description: Se fornecido, deve ser string não vazia e nome único
 *               description:
 *                 type: string
 *                 nullable: true
 *                 minLength: 1
 *                 description: Se fornecido, deve ser string não vazia
 *               more_info:
 *                 type: string
 *                 nullable: true
 *                 minLength: 1
 *                 description: Se fornecido, deve ser string não vazia
 *               deploy_link:
 *                 type: string
 *                 nullable: true
 *                 minLength: 1
 *                 description: Se fornecido, deve ser string não vazia
 *               repository_link:
 *                 type: string
 *                 nullable: true
 *                 minLength: 1
 *                 description: Se fornecido, deve ser string não vazia
 *               imageIds:
 *                 type: array
 *                 nullable: true
 *                 minItems: 1
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 description: Se fornecido, deve ser array não vazio de números inteiros ≥1
 *               stackIds:
 *                 type: array
 *                 nullable: true
 *                 minItems: 1
 *                 items:
 *                   type: integer
 *                   minimum: 1
 *                 description: Se fornecido, deve ser array não vazio de números inteiros ≥1
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 1
 *                 description: Se fornecido, deve ser número inteiro ≥1 e categoria deve existir
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
 *                   example: "Project with id '1' has been updated successfully"
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Projeto Atualizado"
 *                     description:
 *                       type: string
 *                       example: "Nova descrição"
 *                     more_info:
 *                       type: string
 *                       example: "Novas informações"
 *                     deploy_link:
 *                       type: string
 *                       example: "https://novo-deploy.com"
 *                     repository_link:
 *                       type: string
 *                       example: "https://github.com/novo/repo"
 *                     category:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Web Development"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                     stacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           stack:
 *                             type: object
 *       400:
 *         description: |
 *           Dados inválidos fornecidos (retornado pelo middleware).
 *           Mensagens específicas das funções de validação.
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
 *                       example: "'id' must be a valid integer and positive number"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'name' must be a non-empty string"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'imageIds' must be a non-empty array of numbers"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'imageIds' contains an invalid value ('abc'). All items must be valid integer numbers."
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'categoryId' must be a valid integer and positive number"
 *       404:
 *         description: |
 *           Recurso não encontrado (retornado pelo middleware).
 *           Inclui verificação específica da existência da categoria.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not Found"
 *                     message:
 *                       type: string
 *                       example: "Project not found"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not Found"
 *                     message:
 *                       type: string
 *                       example: "Project category with id '999' not found"
 *       409:
 *         description: Conflito de nome (retornado pelo middleware apenas se name fornecido)
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
 *                   example: "A project already exists with the name 'Novo Nome'"
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: ..."
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos com paginação
 *     description: |
 *       Retorna todos os projetos paginados com estrutura específica de dados.
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       Inclui categoria completa, imagens (apenas id, name, category) e stacks com dados completos.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página (começa em 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
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
 *                   example: "Successfully got all the projects"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 42
 *                     totalPages:
 *                       type: integer
 *                       example: 9
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Meu Projeto Incrível"
 *                           description:
 *                             type: string
 *                             example: "Descrição do projeto"
 *                           more_info:
 *                             type: string
 *                             example: "Informações adicionais"
 *                           deploy_link:
 *                             type: string
 *                             example: "https://meuprojeto.com"
 *                           repository_link:
 *                             type: string
 *                             example: "https://github.com/usuario/projeto"
 *                           category:
 *                             type: object
 *                             description: Todos os campos da categoria do projeto
 *                           images:
 *                             type: array
 *                             description: Apenas id, name e category das imagens
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "homepage-screenshot.jpg"
 *                                 category:
 *                                   type: object
 *                                   description: Categoria da imagem
 *                           stacks:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 stack:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                       example: 1
 *                                     name:
 *                                       type: string
 *                                       example: "React"
 *                                     experience:
 *                                       type: string
 *                                       example: "2 years"
 *                                     category:
 *                                       type: object
 *                                       description: Categoria da stack
 *                                     logo:
 *                                       type: string
 *                                       example: "react-logo.png"
 *                     - type: string
 *                       example: "No projects found..."
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: Invalid query parameter"
 */

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Exclui um projeto existente
 *     description: |
 *       Exclui um projeto existente pelo ID.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico do projeto a ser excluído (≥1, inteiro, positivo)
 *     responses:
 *       200:
 *         description: Projeto excluído com sucesso
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
 *                   example: "Successfully deleted the project with id '1'"
 *                 data:
 *                   type: string
 *                   example: "Deleted: [object Object]"
 *       400:
 *         description: ID inválido (retornado pelo middleware)
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
 *                   example: "'id' must be a valid integer and positive number"
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: |
 *           Erro interno do servidor.
 *           Inclui caso onde projeto não existe (erro do Prisma).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Internal server error"
 *                 error:
 *                   type: string
 *                   example: "An unexpected error ocurred"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: Record to delete does not exist"
 */