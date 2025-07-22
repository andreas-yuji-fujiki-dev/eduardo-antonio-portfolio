import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createImageController(req:Request, res:Response){
    const { name } = req.body;

    try {
        // a image already exists with this name?
        const imageAlreadyExists = await prisma.image.findFirst({ where: { name }});

        if( imageAlreadyExists ){
            return res.status(409).json({
                status: "409 - Conflict",
                message: "A image with this name already exists."
            });
        };

        // creating
        const newImage = await prisma.image.create({
            data: { name }
        });

        return res.status(201).json({
            status: "201 - Success",
            message: "Successfully created the image",
            data: newImage
        });

    } catch ( error ) {
        // internal server error case
        return res.status(500).json({
            status: "500 - Server internal error",
            message: "An unexpected error ocurred while creating a new image.",
            error: error
        });
    };
};