import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import bcrypt from "bcrypt";

export default async function userRegisterController( req:Request, res:Response){
    const { user, password } = req.body;
    
    // verify if user already exists
    const userAlreadyExists = await prisma.user.findUnique({ where: { name: user } });

    if( userAlreadyExists ){
        return res.status(409).json({
            "status": "409 - Conflict",
            "message": `User ${user} already exists.`
        });
    };

    // otherwise, try to create the user
    try {
        // encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // new user register
        const newUser = await prisma.user.create({
            data: {
                name: user,
                password: hashedPassword
            }
        });

        // 'created' status
        return res.status(201).json({
            status: "201 - Created",
            data: newUser
        });   
    } catch ( error ) {
        // server internal error message
        res.status(500).json({
            status: "500 - Server internal error.",
            message: error
        });
    };
};