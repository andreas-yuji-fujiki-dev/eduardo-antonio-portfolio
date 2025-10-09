import { Request, Response, NextFunction } from "express";

export default function deleteStackMiddleware(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // id type validation
    if( !id || isNaN(Number(id)) ){
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "The 'id' parameter must be a valid number",
        });
    };

    // proceed
    next();
}
