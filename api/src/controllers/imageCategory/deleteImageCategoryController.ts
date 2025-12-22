import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse"; 

export default async function deleteImageCategoryController(req: Request, res: Response){
    const { id } = req.params;
    
    try {
        // deleting & success return message
        const deletedImageCategory = await prisma.imageCategory.delete({ where: { id: Number(id) } });
        
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully deleted the image category with id '${id}'`,
            data: `Deleted: ${deletedImageCategory}`
        })

    } catch (error: unknown) {

        // internal server error
        const response = makeErrorResponse(error, `An unexpected error ocurred while trying to delete image category with id '${id}'`);
        return res.status(500).json(response);
    }
}