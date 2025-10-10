import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateProjectCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    const { name } = req.body;
    
    try {
        // validating id
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                status: "400 - Bad request",
                message: "You must provide a valid integer ID on request params",
            })
        };

        // validating name from body
        if(!name || typeof(String(name)) !== 'string' ) return res.status(400).json({
            status: "400 - Bad request",
            message: "You need to provide the name to edit on the request body"
        });

        // verify if project category exists
        const foundProjectCategory = await prisma.projectCategory.findUnique({ where: { id: Number(id) } });

        if(!foundProjectCategory) return res.status(400).json({
            status: "400 - Bad request",
            message: `Cannot find project category with id '${id}'`
        });

        // success
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