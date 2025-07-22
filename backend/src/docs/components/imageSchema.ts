/**
 * @swagger
 * components:
 *   schemas:
 *     ImageResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         message:
 *           type: string
 *           example: "Successfully got all images"
 *         data:
 *           oneOf:
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *             - type: string
 *               example: "No images found..."
 * 
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "logo.png"
 *         projectId:
 *           type: integer
 *           nullable: true
 *           example: 3
 *         stackLogo:
 *           $ref: '#/components/schemas/Stack'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "react-logo.png"
 *         stackLogo:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: integer
 *               example: 3
 *             name:
 *               type: string
 *               example: "React"
 *             experience:
 *               type: integer
 *               example: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageByIdResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         data:
 *           $ref: '#/components/schemas/ImageDetail'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageCreateRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome único da imagem
 *           example: "novo-logo.png"
 * 
 *     ImageCreateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "201 - Success"
 *         message:
 *           type: string
 *           example: "Successfully created the image"
 *         data:
 *           $ref: '#/components/schemas/Image'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageUpdateRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Novo nome para a imagem (deve ser único)
 *           example: "logo-atualizado.png"
 * 
 *     ImageUpdateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         message:
 *           type: string
 *           example: "Successfully edited the image"
 *         data:
 *           $ref: '#/components/schemas/Image'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageDeleteResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         message:
 *           type: string
 *           example: "Successfully deleted the image"
 *         deleted_image:
 *           $ref: '#/components/schemas/Image'
 */