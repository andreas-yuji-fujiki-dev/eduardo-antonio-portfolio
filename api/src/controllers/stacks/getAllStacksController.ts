import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllStacksController(req:Request, res:Response){
    try {
        // get all stacks
        const allStacks = await prisma.stack.findMany();
        
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the stacks",
            data: !!allStacks.length ? allStacks : "No stacks found..."
        });

    } catch ( error ) {
        // in case of server internal error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    };
};