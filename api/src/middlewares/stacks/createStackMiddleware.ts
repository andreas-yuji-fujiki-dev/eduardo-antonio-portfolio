import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";

export default async function createStackMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, experience, logoId } = req.body;

        // name validation
        const errorValidatingName = validateString('name', name, res);
        if( errorValidatingName ) return errorValidatingName;

        // avoid name conflict
        const nameConflict = await prisma.stack.findUnique({ where: { name } });
        if( nameConflict ) return res.status(409).json({
            status: "409 - Conflict",
            message: `A stack already exists with the name '${name}'`
        });

        // experience level content validation
        if ( experience && ![1, 2, 3].includes(experience) ) {
            return res.status(400).json({
                status: "400 - Bad Request",
                message: "The 'experience' field must be present and be one of these: 1 (Beginner), 2 (Intermediate), or 3 (Advanced)"
            })
        };

        // logo id type validation
        const errorValidatingLogoId = validateId('logoId', logoId, res);
        if( errorValidatingLogoId ) return errorValidatingLogoId;

        // logo existance validation
        const existingLogoImage = await prisma.image.findUnique({ where: { id: Number(logoId) }});
        if( !existingLogoImage ) return res.status(404).json({
            status: "404 - Not found",
            message: `Logo image with id '${logoId}' does not exists`
        });

        // success case
        next()

    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}
