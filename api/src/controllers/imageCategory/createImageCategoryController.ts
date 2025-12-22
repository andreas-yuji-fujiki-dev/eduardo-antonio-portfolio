import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse";

export default async function createImageCategoryController(req: Request, res: Response) {
    try {
        const { name } = req.body;

        // creating
        const createdImageCategory =
            await prisma.imageCategory.create({ data: { name } });

        // success
        return res.status(201).json({
            status: "201 - Created",
            message: `Successfully created the image category '${name}'`,
            data: createdImageCategory
        });

    } catch (error: unknown) {
        const response = makeErrorResponse(error, "Something went wrong");
        return res.status(500).json(response);
    }
}
