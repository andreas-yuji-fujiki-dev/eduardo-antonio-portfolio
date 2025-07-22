/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Meu Projeto"
 *         description:
 *           type: string
 *           example: "Descrição detalhada"
 *         more_info:
 *           type: string
 *           example: "Informações adicionais"
 *         deploy_link:
 *           type: string
 *           format: uri
 *           example: "https://deploy.com"
 *         repository_link:
 *           type: string
 *           format: uri
 *           example: "https://github.com"
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Image'
 *         stacks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               stack:
 *                 $ref: '#/components/schemas/Stack'
 * 
 *     ProjectResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "200 - Success"
 *         data:
 *           oneOf:
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *             - type: string
 *               example: "No projects found..."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         more_info:
 *           type: string
 *           nullable: true
 *         deploy_link:
 *           type: string
 *           format: uri
 *           nullable: true
 *         repository_link:
 *           type: string
 *           format: uri
 *           nullable: true
 *         imageIds:
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 *         stackIds:
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 */