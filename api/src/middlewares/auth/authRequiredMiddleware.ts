import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default function authRequiredMiddleware(req:Request, res:Response, next:NextFunction){
    // jwt secret & header token
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.headers.authorization;

    // if there is not token
    if( !token || typeof token !== "string" ){
        return res.status(401).json({
            status: "401 - Access denied",
            message: "You must to have a bearer token in string type, make login first."
        });
    };

    // if there is not jwt secret
    if( !JWT_SECRET ){
        throw new Error("JWT_SECRET is not defined.");
    };

    try {
        // formatting token
        const formattedToken = token.replace("Bearer ", "");

        // decoding token
        const decodedToken = jwt.verify(formattedToken, JWT_SECRET);

        // appending token into user
        req.user = decodedToken;

        // then proceed
        next()
    } catch (error) {
        // in case of server internal error
        return res.status(401).json({
            status: "401 - Access denied.",
            message: "You must to have bearer token in string type, make login first."
        });
    };
};