import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function userLoginController(req: Request, res: Response) {
    const { user, password } = req.body;

    try {
        // verify if user exists
        const userDatabaseInfo = await prisma.user.findUnique({ 
            where: { 
                name: user 
            }
        });

        if (!userDatabaseInfo) {
            return res.status(404).json({
                status: "404 - Not found.",
                message: "User not found."
            });
        }

        // verify if password matches
        const passwordMatches = await bcrypt.compare(password, userDatabaseInfo.password);

        if (!passwordMatches) {
            return res.status(401).json({
                status: "401 - Unauthorized",
                message: "Wrong password."
            });
        }

        // get jwt secret
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        // generate jwt token
        const token = jwt.sign({ id: userDatabaseInfo.id }, JWT_SECRET, {
            expiresIn: "2h"
        });

        // success message
        return res.status(200).json({
            status: "200 - Success.",
            message: "You have successfully logged in.",
            token: token
        });

    } catch (error) {
        // in case of internal server error
        console.error("Login error:", error);

        return res.status(500).json({
            status: "500 - Internal server error.",
            message: "Something went wrong."
        });
    }
}