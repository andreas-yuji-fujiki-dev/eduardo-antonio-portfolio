/**
 * @swagger
 * tags:
 *   - name: Stack Categories
 *     description: Endpoints para gerenciamento de categorias de stacks
 *
 *   - name: Stacks
 *     description: Endpoints para gerenciamento de stacks
 */

/**
 * @swagger
 * /stackCategory:
 *   get:
 *     summary: Lista todas as categorias de stacks com paginação
 *     description: |
 *       Retorna todas as categorias de stacks paginadas com suas stacks relacionadas.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *     
 *     tags: [Stack Categories]
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
 *                   example: "Successfully got all the stack categories"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPage:
 *                       type: integer
 *                       example: 4
 *                     totalItems:
 *                       type: integer
 *                       example: 20
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
 *                             example: "Frontend"
 *                           stacks:
 *                             type: array
 *                             description: Todas as stacks relacionadas com todos os campos
 *                             items:
 *                               type: object
 *                     - type: string
 *                       example: "No stack categories found..."
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno do servidor (estrutura diferente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500 - Server internal error"
 *                 error:
 *                   type: string
 *                   example: "An error occurred while trying to list all stack categories"
 *                 details:
 *                   type: string
 *                   example: "Prisma error: ..."
 */

/**
 * @swagger
 * /stackCategory/search:
 *   get:
 *     summary: Busca categorias de stacks por nome
 *     description: |
 *       Busca categorias de stacks que contenham o termo pesquisado no campo 'name'.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       A busca é case-insensitive e inclui todas as stacks relacionadas.
 *     tags: [Stack Categories]
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
 *                             example: "Frontend"
 *                           stacks:
 *                             type: array
 *                             description: Todas as stacks relacionadas com todos os campos
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
 * /stackCategory/{id}:
 *   get:
 *     summary: Busca uma categoria de stack específica pelo ID
 *     description: |
 *       Retorna uma categoria de stack específica pelo ID com todas as suas stacks relacionadas.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Stack Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da categoria de stack (≥1, inteiro, positivo)
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
 *                   example: "Successfully found stack category with id '1'"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Frontend"
 *                     stacks:
 *                       type: array
 *                       description: Todas as stacks relacionadas com todos os campos
 *                       items:
 *                         type: object
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
 *                   example: "Cannot find stack category with id '999'"
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
 * /stackCategory:
 *   post:
 *     summary: Cria uma nova categoria de stack
 *     description: |
 *       Cria uma nova categoria de stack.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *       **Validações do Middleware:**
 *       - `name` deve ser string não vazia
 *       - `name` deve ser único (não pode existir outra categoria com mesmo nome)
 *     tags: [Stack Categories]
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
 *                 minLength: 1
 *                 example: "Frontend"
 *                 description: Nome da categoria (deve ser único)
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
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
 *                   example: "Successfully created the stack category with name 'Frontend'"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Frontend"
 *       400:
 *         description: Nome inválido
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
 *                   example: "'name' must be a non-empty string"
 *       409:
 *         description: Conflito de nome
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
 *                   example: "Stack category with name 'Frontend' already exists"
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
 * /stackCategory/{id}:
 *   put:
 *     summary: Atualiza o nome de uma categoria de stack existente
 *     description: |
 *       Atualiza o nome de uma categoria de stack existente pelo ID.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Stack Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da categoria de stack a ser atualizada
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
 *                 minLength: 1
 *                 example: "Backend Development"
 *                 description: Novo nome da categoria (deve ser único)
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
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
 *                   example: "Successfully edited the name of stack category with id '1' to 'Backend Development'"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Backend Development"
 *       400:
 *         description: Dados inválidos fornecidos
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
 *       404:
 *         description: Categoria não encontrada
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
 *                   example: "Cannot find stack category with id '999'"
 *       409:
 *         description: Conflito de nome
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
 *                   example: "A stack category already exists with the name 'Backend Development'"
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
 * /stackCategory/{id}:
 *   delete:
 *     summary: Delete uma categoria de stack pelo ID
 *     description: |
 *       Endpoint para exclusão de uma categoria de stack do sistema.
 *       **Requer autenticação JWT via Bearer Token**
 *     tags: ["Stack Categories"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria de stack a ser excluída
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the stack category
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
 *                   example: "Successfully deleted the stack category with id '1'"
 *                 data:
 *                   type: string
 *                   example: "Deleted: {id: 1, name: 'Backend'}"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "401 - Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "You must to have a bearer token in string type, make login first"
 *       404:
 *         description: Stack category not found
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
 *                   example: "Cannot find stack category with id '1'"
 *       500:
 *         description: Internal server error
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
 *                   example: "Error description here"
 */

/**
 * @swagger
 * /stacks:
 *   get:
 *     summary: Lista todas as stacks com paginação
 *     description: |
 *       Retorna todas as stacks paginadas com relações completas.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Stacks]
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
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 8
 *                     totalItems:
 *                       type: integer
 *                       example: 40
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
 *                             example: "React"
 *                           experience:
 *                             type: string
 *                             example: "2 years"
 *                           category:
 *                             type: object
 *                             description: Todos os campos da categoria (sem categoryId)
 *                           logo:
 *                             type: object
 *                             description: Todos os campos do logo (sem logoId)
 *                           projects:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 project:
 *                                   type: object
 *                                   description: Todos os campos do projeto
 *                     - type: string
 *                       example: "No stacks found..."
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
 * /stacks/search:
 *   get:
 *     summary: Busca stacks por nome
 *     description: |
 *       Busca stacks que contenham o termo pesquisado no campo 'name'.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       A busca é case-insensitive e inclui relações completas.
 *       
 *     tags: [Stacks]
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
 *                             example: "React"
 *                           experience:
 *                             type: string
 *                             example: "1"
 *                           categoryId:
 *                             type: integer
 *                             example: 1
 *                           logoId:
 *                             type: integer
 *                             example: 1
 *                           category:
 *                             type: object
 *                             description: Todos os campos da categoria
 *                           logo:
 *                             type: object
 *                             description: Todos os campos do logo
 *                           projects:
 *                             type: array
 *                             description: Todos os projetos relacionados (include direto)
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
 * /stacks/{id}:
 *   get:
 *     summary: Busca uma stack específica pelo ID
 *     description: |
 *       Retorna uma stack específica pelo ID com relações completas.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da stack (≥1, inteiro, positivo)
 *     responses:
 *       200:
 *         description: Stack encontrada e retornada com sucesso
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
 *                   example: "Successfully got the stack with id '1'"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "React"
 *                     experience:
 *                       type: string
 *                       example: "2 years"
 *                     category:
 *                       type: object
 *                       description: Todos os campos da categoria (sem categoryId)
 *                     logo:
 *                       type: object
 *                       description: Todos os campos do logo (sem logoId)
 *                     projects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           project:
 *                             type: object
 *                             description: Todos os campos do projeto
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
 *       404:
 *         description: Stack não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Erro do middleware
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "Cannot find a stack with id '999'"
 *                 - type: object
 *                   description: Erro do controller (validação duplicada)
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "Cannot find stack with id '999'"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Erro do middleware
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal Server Error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error occurred"
 *                     details:
 *                       type: string
 *                 - type: object
 *                   description: Erro do controller
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal server error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error ocurred"
 *                     details:
 *                       type: string
 */

/**
 * @swagger
 * /stacks:
 *   post:
 *     summary: Cria uma nova stack
 *     description: |
 *       Cria uma nova stack com validações complexas.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *       **Validações Específicas do Middleware:**
 *       
 *       **validateString (name):**
 *       - Deve ser do tipo string
 *       - Não pode ser string vazia ou apenas espaços
 *       - Mensagem de erro: `'name' must be a non-empty string`
 *       
 *       **validateId (logoId):**
 *       - Deve ser string não vazia
 *       - Deve ser número válido
 *       - Deve ser número inteiro
 *       - Deve ser do tipo number
 *       - Deve ser maior que 0
 *       - Mensagem de erro: `'logoId' must be a valid integer and positive number`
 *       
 *       **experience:**
 *       - Se fornecido, deve ser 1, 2 ou 3
 *       - Mensagem de erro: `"The 'experience' field must be present and be one of these: 1 (Beginner), 2 (Intermediate), or 3 (Advanced)"`
 *       
 *       **Validações Adicionais:**
 *       - Name deve ser único (conflito → 409)
 *       - Logo deve existir no banco se logoId fornecido
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
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 example: "React"
 *                 description: Nome da stack (deve ser único)
 *               experience:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 2
 *                 description: |
 *                   Nível de experiência (opcional):
 *                   - 1 = Beginner
 *                   - 2 = Intermediate  
 *                   - 3 = Advanced
 *               logoId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *                 description: ID da imagem do logo (opcional)
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
 *                   example: "Stack created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "React"
 *                     experience:
 *                       type: integer
 *                       example: 2
 *                     category:
 *                       type: object
 *                       description: Todos os campos da categoria (sem categoryId)
 *                     logo:
 *                       type: object
 *                       description: Todos os campos do logo (sem logoId)
 *                     projects:
 *                       type: array
 *                       description: Array vazio inicialmente
 *                       items:
 *                         type: object
 *       400:
 *         description: Dados inválidos fornecidos
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
 *                       example: "'name' must be a non-empty string"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad Request"
 *                     message:
 *                       type: string
 *                       example: "The 'experience' field must be present and be one of these: 1 (Beginner), 2 (Intermediate), or 3 (Advanced)"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'logoId' must be a valid integer and positive number"
 *       404:
 *         description: Logo image não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404 - Not found"
 *                 message:
 *                       type: string
 *                       example: "Logo image with id '999' does not exists"
 *       409:
 *         description: Conflito de nome
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
 *                   example: "A stack already exists with the name 'React'"
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
 * /stacks/{id}:
 *   put:
 *     summary: Atualiza uma stack existente
 *     description: |
 *       Atualiza uma stack existente pelo ID. Todos os campos são opcionais.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *       **validateString (name):**
 *       - Deve ser do tipo string
 *       - Não pode ser string vazia ou apenas espaços
 *       - Mensagem de erro: `'name' must be a non-empty string`
 *       
 *       **validateId (experience, logoId, categoryId):**
 *       - Deve ser string não vazia
 *       - Deve ser número válido
 *       - Deve ser número inteiro
 *       - Deve ser do tipo number
 *       - Deve ser maior que 0
 *       - Mensagem de erro: `'${fieldName}' must be a valid integer and positive number`
 *       
 *       **validateNumberArray (projectIds):**
 *       - Deve ser array
 *       - Array não pode estar vazio
 *       - Todos os itens devem ser números inteiros válidos
 *       - Mensagem de erro: `'projectIds' must be a non-empty array of numbers`
 *       
 *       **Validações de Existência:**
 *       - Stack deve existir
 *       - Logo deve existir se logoId fornecido
 *       - Categoria deve existir se categoryId fornecido e não null
 *       
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da stack a ser atualizada
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
 *                 description: Nome da stack (deve ser único se fornecido)
 *               experience:
 *                 type: integer
 *                 nullable: true
 *                 description: Nível de experiência (apenas valida se é número)
 *               logoId:
 *                 type: integer
 *                 nullable: true
 *                 description: ID da imagem do logo
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 description: ID da categoria da stack (null para remover categoria)
 *               projectIds:
 *                 type: array
 *                 nullable: true
 *                 items:
 *                   type: integer
 *                 description: Array de IDs de projetos (apenas adiciona novas relações)
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
 *                   example: "Stack with id '1' updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "React"
 *                     experience:
 *                       type: integer
 *                       example: 2
 *                     category:
 *                       type: object
 *                       description: Todos os campos da categoria (sem categoryId)
 *                     logo:
 *                       type: object
 *                       description: Todos os campos do logo (sem logoId)
 *                     projects:
 *                       type: array
 *                       description: Projetos relacionados (include direto)
 *                       items:
 *                         type: object
 *       400:
 *         description: Dados inválidos fornecidos
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
 *                       example: "'name' must be a non-empty string"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'experience' must be a valid integer and positive number"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'logoId' must be a valid integer and positive number"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'categoryId' must be a valid integer and positive number"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'projectIds' must be a non-empty array of numbers"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "400 - Bad request"
 *                     message:
 *                       type: string
 *                       example: "'projectIds' contains an invalid value ('abc'). All items must be valid integer numbers."
 *       404:
 *         description: Recurso não encontrado
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
 *                       example: "Cannot find the stack with id '999'"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not Found"
 *                     message:
 *                       type: string
 *                       example: "Cannot find any image with id '999'"
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not Found"
 *                     message:
 *                       type: string
 *                       example: "Cannot find any stack category with id '999'"
 *       409:
 *         description: Conflito de nome
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
 *                   example: "A stack already exists with the name 'React'"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Erro do middleware
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal Server Error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error occurred"
 *                     details:
 *                       type: string
 *                 - type: object
 *                   description: Erro do controller
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "500 - Internal server error"
 *                     error:
 *                       type: string
 *                       example: "An unexpected error occurred"
 *                     details:
 *                       type: string
 */

/**
 * @swagger
 * /stacks/{id}:
 *   delete:
 *     summary: Exclui uma stack existente
 *     description: |
 *       Exclui uma stack existente pelo ID.
 *       
 *       **REQUER AUTENTICAÇÃO** via Bearer token.
 *       
 *     tags: [Stacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID numérico da stack a ser excluída
 *     responses:
 *       200:
 *         description: Stack excluída com sucesso
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
 *                   example: "Stack with id '1' deleted successfully"
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
 *       404:
 *         description: Stack não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Erro do middleware
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not found"
 *                     message:
 *                       type: string
 *                       example: "Cannot find a stack with id '999'"
 *                 - type: object
 *                   description: Erro do controller (validação duplicada)
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "404 - Not Found"
 *                     message:
 *                       type: string
 *                       example: "Stack with id '999' does not exists"
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