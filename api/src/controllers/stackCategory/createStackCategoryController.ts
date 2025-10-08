import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createStackCategoryController(req: Request, res: Response){
    try {
        // creating
        const { name } = req.body;

        const createdStackCategory = await prisma.stackCategory.create({ data: { name } });

        // success
        return res.status(201).json({
            status: "201 - Created",
            message: `Successfully created the stack category with name '${name}'`,
            data: createdStackCategory
        })
    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}