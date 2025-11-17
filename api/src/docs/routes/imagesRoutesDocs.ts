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
 *   post:
 *     summary: Faz upload de uma nova imagem
 *     description: Faz upload do arquivo (campo `image`) e registra um novo registro no banco.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
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
 *               name:
 *                 type: string
 *                 description: Nome opcional (mas seu controller usa o filename)
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso
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
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "image-1634234234-123.png"
 *                     url:
 *                       type: string
 *                       example: "/uploads/image-1634234234-123.png"
 *       400:
 *         description: Nenhum arquivo enviado ou arquivo inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No image uploaded"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Erro interno ao criar imagem (remove o arquivo enviado em caso de falha)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */

/**
 * @swagger
 * /images/search:
 *   get:
 *     summary: Busca imagens por termo
 *     description: Busca imagens pelo campo `name` (contains). Usa query param `q`.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: 'Termo de busca (ex: "logo")'

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
 *                         $ref: '#/components/schemas/ImageFull'
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
 * /images/{id}:
 *   get:
 *     summary: Obtém uma imagem pelo ID
 *     description: Retorna o registro da imagem especificada pelo `id`.
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da imagem
 *     responses:
 *       200:
 *         description: Imagem encontrada
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
 *                   $ref: '#/components/schemas/ImageFull'
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
 *                   example: "The image with id '1' does not exists"
 *       500:
 *         description: Erro interno ao obter imagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *
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
 *     summary: Substitui o arquivo da imagem (replace)
 *     description: Recebe um novo arquivo multipart em `image`, remove o arquivo antigo e atualiza o registro com o novo `name`.
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
 *     responses:
 *       200:
 *         description: Imagem substituída com sucesso
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
 *                   example: "Image replaced successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "image-1634234234-NEW.png"
 *                     url:
 *                       type: string
 *                       example: "/uploads/image-1634234234-NEW.png"
 *       400:
 *         description: Arquivo não enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No image file provided"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Imagem antiga não encontrada (antes de substituir)
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
 *         description: Erro interno ao substituir imagem (remove o novo arquivo em caso de falha)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
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
