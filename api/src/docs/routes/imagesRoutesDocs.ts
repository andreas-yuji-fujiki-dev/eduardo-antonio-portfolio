/**
 * @swagger
 * tags:
 *   - name: ImageCategories
 *     description: Endpoints para gerenciamento de categorias de imagens
 *   - name: Images
 *     description: Endpoints para gerenciamento de imagens (upload, update, replace, delete)
 */

/**
 * @swagger
 * /imageCategory:
 *   get:
 *     summary: Lista todas as categorias de imagens (com paginação)
 *     description: Retorna categorias paginadas. Os resultados incluem o array de imagens relacionadas.
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Quantidade de itens por página
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
 *                   example: "Successfully got all image categories"
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
 *                         $ref: '#/components/schemas/ImageCategoryWithImages'
 *                     - type: string
 *                       example: "No image categories found..."
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno ao buscar categorias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
 *   post:
 *     summary: Cria uma nova categoria de imagens
 *     description: Cria uma nova categoria se o nome for válido e não estiver duplicado.
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
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
 *                 example: "Nature"
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
 *                   example: "Successfully created the image category 'Nature'"
 *                 data:
 *                   $ref: '#/components/schemas/ImageCategory'
 *       400:
 *         description: Campo ausente ou inválido (validação de string)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidOrMissingFieldError'
 *       409:
 *         description: Conflito - categoria com mesmo nome já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno ao criar categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /imageCategory/search:
 *   get:
 *     summary: Busca categorias por termo
 *     description: Busca categorias pelo campo `name` (contains). Usa query param `q`.
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: 'Termo de busca (ex: "nature")'
 *     responses:
 *       200:
 *         description: Resultado da busca
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
 *                         $ref: '#/components/schemas/ImageCategoryWithImages'
 *                     - type: string
 *                       example: "Nothing found..."
 *       400:
 *         description: Query `q` ausente ou inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidOrMissingFieldError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno durante a busca
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /imageCategory/{id}:
 *   get:
 *     summary: Obtém uma categoria pelo ID
 *     description: Retorna a categoria especificada pelo `id` (inclui imagens).
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
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
 *                   example: "Successfully got image category"
 *                 data:
 *                   $ref: '#/components/schemas/ImageCategoryWithImages'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidIdError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                   example: "Cannot find image category with id '123'"
 *       500:
 *         description: Erro interno ao obter categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
 *   put:
 *     summary: Atualiza o nome de uma categoria
 *     description: Atualiza o `name` da categoria identificada pelo `id`.
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser atualizada
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
 *                 example: "Updated Category Name"
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
 *                   example: "Successfully updated category '1' to name 'Updated Category Name'"
 *                 data:
 *                   $ref: '#/components/schemas/ImageCategory'
 *       400:
 *         description: ID inválido ou campo `name` inválido
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/InvalidIdError'
 *                 - $ref: '#/components/schemas/InvalidOrMissingFieldError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                   example: "Cannot find the category with id '1'"
 *       409:
 *         description: Conflito de nome (nome duplicado)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictError'
 *       500:
 *         description: Erro interno ao atualizar categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
 *   delete:
 *     summary: Remove uma categoria pelo ID
 *     description: Deleta a categoria especificada pelo `id`.
 *     tags: [ImageCategories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser removida
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
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
 *                   example: "Successfully deleted the image category with id '1'"
 *                 data:
 *                   type: string
 *                   example: "Deleted: [object Object]"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidIdError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                   example: "Impossible to find image category with id '1'"
 *       500:
 *         description: Erro interno ao deletar categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lista todas as imagens (com paginação)
 *     description: Retorna imagens paginadas; cada item inclui referências de category, project e stackLogo.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: Lista de imagens retornada com sucesso
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
 *                   example: "Successfully got all images"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     totalItems:
 *                       type: integer
 *                       example: 50
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
 *                         $ref: '#/components/schemas/ImageListItem'
 *                     - type: string
 *                       example: "No images found..."
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno ao listar imagens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
 

/**
 * @swagger
 * /images/search:
 *   get:
 *     summary: Search images by name
 *     description: |
 *       Endpoint para buscar imagens pelo nome (case-insensitive).
 *       **Requer autenticação JWT via Bearer Token**
 *       .
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Termo de busca para filtrar imagens pelo nome
 *         schema:
 *           type: string
 *           example: "logo"
 *     responses:
 *       200:
 *         description: Successfully searched images
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
 *                             example: "react-logo"
 *                           category:
 *                             type: object
 *                           project:
 *                             type: object
 *                           stackLogo:
 *                             type: object
 *                     - type: string
 *                       example: "Nothing found..."
 *       400:
 *         description: Bad Request - Invalid query parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad Request"
 *         message:
 *           type: string
 *           example: "Invalid or missing 'query' parameter"
 */

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get image by ID
 *     description: |
 *       Endpoint para obter uma imagem específica pelo seu ID.
 *       **Requer autenticação JWT via Bearer Token**
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da imagem a ser buscada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the image
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
 *                   example: "Successfully got the image with id '1'"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "react-logo"
 *                     stackLogo:
 *                       type: object
 *                     category:
 *                       type: object
 *                     project:
 *                       type: object
 *       400:
 *         description: Bad Request - Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
 *         description: Image not found 
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
 *                   example: "The image with id '1' does not exists"
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad Request"
 *         message:
 *           type: string
 *           example: "Invalid ID format"
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload and create a new image
 *     description: |
 *       Endpoint para upload e criação de uma nova imagem no sistema.
 *       **Requer autenticação JWT via Bearer Token**
 *       
 *       - Apenas arquivos de imagem são aceitos (JPEG, PNG, GIF)
 *       - Tamanho máximo: 10MB  
 *       **Nome do arquivo:** Será renomeado para formato `image-{timestamp}-{random}.{ext}`
 *       
 *       **Em caso de erro:** O arquivo enviado é automaticamente removido do servidor
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Arquivo de imagem com as seguintes especificações:
 *                   - Formatos permitidos: JPEG, JPG, PNG, GIF
 *                   - Mime-types permitidos: image/jpeg, image/png, image/gif
 *                   - Tamanho máximo: 10MB
 *     responses:
 *       201:
 *         description: Image created successfully
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
 *                   example: "Image uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "image-1234567890123.jpg"
 *                     url:
 *                       type: string
 *                       example: "/uploads/image-1234567890123.jpg"
 *       400:
 *         description: Bad Request - Validation error
 *         content:
 *           application/json:
 *             examples:
 *               noImageUploaded:
 *                 summary: No image file provided
 *                 value:
 *                   error: "No image uploaded"
 *               invalidFileType:
 *                 summary: Invalid file type or format
 *                 value:
 *                   error: "Only JPEG, PNG, GIF are allowed!"
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
 * /images:
 *   get:
 *     summary: Get all images with pagination
 *     description: |
 *       Endpoint para listar todas as imagens do sistema com suporte a paginação.
 *       **Requer autenticação JWT via Bearer Token**
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página (padrão 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Quantidade de itens por página (padrão 5)
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully retrieved all images
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
 *                   example: "Successfully got all images"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     totalItems:
 *                       type: integer
 *                       example: 12
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
 *                           name:
 *                             type: string
 *                           category:
 *                             type: string
 *                           project:
 *                             type: string
 *                           stackLogo:
 *                             type: string
 *                     - type: string
 *                       example: "No images found..."
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
 *       500:
 *         description: Internal server error
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
 *                   example: "An error occurred while trying to list all images"
 *                 details:
 *                   type: string
 *                   example: "Error description here"
 */

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Update an existing image
 *     description: |
 *       Endpoint para atualizar uma imagem existente no sistema.
 *       **Requer autenticação JWT via Bearer Token**
 *       
 *       **Funcionalidades:**
 *       - Atualizar arquivo de imagem (upload de novo arquivo)
 *       - Renomear arquivo existente
 *       - Atualizar relações (project, stack, category)
 *       - Remover relações (setando para null)
 *       
 *       **Validações do Middleware:**
 *       1. Valida formato de todos os IDs (id, projectId, stackId, categoryId)
 *       2. Verifica se a imagem existe
 *       3. Verifica se a image category existe
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da imagem a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   - Substitui o arquivo existente
 *                   - Remove o arquivo antigo automaticamente
 *                   - Formatos: JPEG, PNG, GIF (validação via multer)
 *               name:
 *                 type: string
 *                 description: |
 *                   Novo nome para o arquivo (opcional)
 *                   - Se não fornecer extensão, mantém a original
 *                   - Exemplo: "nova-imagem.jpg" ou "nova-imagem"
 *               projectId:
 *                 type: integer
 *                 nullable: true
 *                 description: |
 *                   ID do projeto relacionado (opcional)
 *                   - Use null para remover a relação
 *                   - Exemplo: 1 ou null
 *               stackId:
 *                 type: integer
 *                 nullable: true
 *                 description: |
 *                   ID da stack relacionada (opcional)
 *                   - Use null para remover a relação
 *                   - Exemplo: 2 ou null
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 description: |
 *                   ID da categoria da imagem (opcional)
 *                   - Use null para remover a relação
 *                   - Exemplo: 3 ou null
 *     responses:
 *       200:
 *         description: Image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Image with id '1' has been updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "image-1234567890123.jpg"
 *                     project:
 *                       type: object
 *                     stackLogo:
 *                       type: object
 *                     category:
 *                       type: object
 *       400:
 *         description: Bad Request - Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
 *         description: Not Found - Entity not found
 *         content:
 *           application/json:
 *             examples:
 *               imageNotFound:
 *                 summary: Image not found
 *                 value:
 *                   status: "404 - Not Found"
 *                   message: "Image with id '1' does not exists"
 *               imageCategoryNotFound:
 *                 summary: Image category not found
 *                 value:
 *                   status: "404 - Not found"
 *                   message: "Image category with id '1' does not exists"
 *               projectNotFound:
 *                 summary: Project not found
 *                 value:
 *                   status: "404 - Not Found"
 *                   message: "Project with id '1' does not exists"
 *               stackNotFound:
 *                 summary: Stack not found
 *                 value:
 *                   status: "404 - Not Found"
 *                   message: "Stack with id '1' does not exists"
 *               categoryNotFound:
 *                 summary: Image category not found
 *                 value:
 *                   status: "404 - Not found"
 *                   message: "Image category with id '1' does not exists"
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad Request"
 *         message:
 *           type: string
 *           example: "Invalid ID format for parameter 'id'"
 */

/**
 *   put:
 *     summary: Atualiza metadados ou renomeia/substitui arquivo da imagem
 *     description: Atualiza campos (`name`, `projectId`, `stackId`, `categoryId`). Pode também receber `image` multipart para trocar o arquivo fisico; em caso de upload parcial, o middleware remove arquivo se necessário.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               projectId:
 *                 type: integer
 *                 nullable: true
 *               stackId:
 *                 type: integer
 *                 nullable: true
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Imagem atualizada com sucesso
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
 *                   example: "Image with id '1' has been updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ImageFull'
 *       400:
 *         description: ID inválido ou campos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/InvalidIdError'
 *                 - $ref: '#/components/schemas/InvalidOrMissingFieldError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Recurso relacionado não existe (image/project/stack/category)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundRelatedError'
 *       500:
 *         description: Erro interno ao atualizar imagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
 *   delete:
 *     summary: Deleta uma imagem pelo ID
 *     description: Remove registro do DB e tenta deletar o arquivo fisico em `uploads/`.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagem deletada com sucesso
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
 *                   example: "Image deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "image-1634234234-123.png"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidIdError'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
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
 *                   example: "Image with id '1' was not found"
 *       500:
 *         description: Erro interno ao deletar imagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /images/{id}/replace:
 *   put:
 *     summary: Replace image file (upload new file and delete old one)
 *     description: |
 *       Endpoint para substituir completamente o arquivo de uma imagem existente.
 *       **Requer autenticação JWT via Bearer Token**
 *       
 *       **Funcionalidade:**
 *       1. Recebe novo arquivo de imagem via upload
 *       2. Remove fisicamente o arquivo antigo do servidor
 *       3. Atualiza no banco apenas o nome do arquivo
 *       
 *       **Validações:**
 *       - Verifica se a imagem existe (404 se não)
 *       - Valida tipo de arquivo (jpeg, jpg, png, gif)
 *       - Valida tamanho (max 5MB)
 *       - Campo obrigatório: 'image' (multipart/form-data)
 *       
 *       **Nome do arquivo:** Gerado automaticamente no formato `image-{timestamp}-{random}.{ext}`
 *       
 *       **Cleanup Automático:**
 *       - Em caso de erro: remove arquivo enviado
 *       - Ignora erro se arquivo antigo não existir (ENOENT)
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da imagem a ser substituída
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Novo arquivo de imagem
 *                   - Formatos permitidos: JPEG, JPG, PNG, GIF
 *                   - Tamanho máximo: 5MB
 *                   - Valida extensão e mime-type
 *     responses:
 *       200:
 *         description: Image replaced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Image replaced successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "image-1234567890123.jpg"
 *                     url:
 *                       type: string
 *                       example: "/uploads/image-1234567890123.jpg"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             examples:
 *               noImageProvided:
 *                 summary: No image file provided
 *                 value:
 *                   status: 400
 *                   message: "No image file provided"
 *               invalidFileType:
 *                 summary: Invalid file type
 *                 value:
 *                   error: "Apenas imagens são permitidas!"
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
 *         description: Image not found
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
 *                   example: "Image with id '1' does not exists"
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
 * /images/{id}:
 *   delete:
 *     summary: Delete an image (database record and physical file)
 *     description: |
 *       Endpoint para deletar uma imagem do sistema.
 *       **Requer autenticação JWT via Bearer Token**
 *       
 *       **Ação Dupla:**
 *       1. Remove o registro do banco de dados
 *       2. Remove o arquivo físico do servidor (pasta 'uploads')
 *       
 *       **Validações do Middleware:**
 *       - Valida formato do ID
 *       - Verifica se a imagem existe (404 se não)
 *       
 *       **Comportamento do Controller:**
 *       - Deleta do banco primeiro
 *       - Tenta deletar arquivo físico
 *       - Ignora erro se arquivo já não existir (ENOENT)
 *       - Se falhar deletar arquivo, lança erro (throw)
 *       
 *       **Nota:** A ordem é importante - deleta do banco primeiro para evitar
 *       situação onde o arquivo é deletado mas o registro permanece.
 *     tags: ["Images"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da imagem a ser deletada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Image deleted successfully
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
 *                   example: "Image deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "image-1234567890123.jpg"
 *       400:
 *         description: Bad Request - Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
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
 *         description: Image not found
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
 *                   example: "Image with id '1' was not found"
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad Request"
 *         message:
 *           type: string
 *           example: "Invalid ID format for parameter 'id'"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Nature"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-02T12:00:00.000Z"
 *
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: "image-1634234234-123.png"
 *         category:
 *           $ref: '#/components/schemas/ImageCategory'
 *         project:
 *           type: object
 *           nullable: true
 *         stackLogo:
 *           type: object
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     ImageCategoryWithImages:
 *       allOf:
 *         - $ref: '#/components/schemas/ImageCategory'
 *         - type: object
 *           properties:
 *             images:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *
 *     ImageListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: "image-1634234234-123.png"
 *         category:
 *           $ref: '#/components/schemas/ImageCategory'
 *         project:
 *           type: object
 *         stackLogo:
 *           type: object
 *
 *     ImageFull:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: "image-1634234234-123.png"
 *         url:
 *           type: string
 *           example: "/uploads/image-1634234234-123.png"
 *         category:
 *           $ref: '#/components/schemas/ImageCategory'
 *         project:
 *           type: object
 *         stackLogo:
 *           type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     InvalidOrMissingFieldError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         error:
 *           type: string
 *           example: "Missing or invalid field"
 *
 *     InvalidIdError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "400 - Bad request"
 *         error:
 *           type: string
 *           example: "The 'id' must be a valid number"
 *
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "401 - Unauthorized"
 *         message:
 *           type: string
 *           example: "You must to have a bearer token in string type, make login first"
 *
 *     NotFoundRelatedError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "404 - Not Found"
 *         message:
 *           type: string
 *           example: "Project with id '3' does not exists"
 *
 *     ConflictError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "409 - Conflict"
 *         message:
 *           type: string
 *           example: "An image category already exists with the name 'Nature'"
 *
 *     InternalError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "500 - Internal server error"
 *         error:
 *           type: string
 *           example: "Something went wrong"
 *         details:
 *           type: string
 *           example: "An unexpected error ocurred"
 *
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
