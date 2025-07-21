import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";


export default function authRequiredMiddleware(req:Request, res:Response, next:NextFunction){
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.headers.authorization;

    if( !token ){
        return res.status(401).json({
            status: "401 - Access denied",
            message: "You must to have a token, try making login first."
        });
    };

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
    }

    try {
        const formattedToken = token.replace("Bearer ", "");
        const decodedToken = jwt.verify(formattedToken, JWT_SECRET);

        req.user = decodedToken

        next()
    } catch (error) {
        // in case of some kind of error
        return res.status(401).json({
            status: "401 - Access denied.",
            message: "You must to have a token, try making login first."
        });
    };
};