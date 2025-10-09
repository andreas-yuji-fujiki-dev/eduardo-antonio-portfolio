import { Request, Response, NextFunction } from "express";

export default function createStackMiddleware(req: Request, res: Response, next: NextFunction) {
    const { 
        name, 
        experience, 
        logoId 
    } = req.body;

    // experience level content validation
    if ( !experience || ![1, 2, 3].includes(experience) ) {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "The 'experience' field must be present and be one of these: 1 (Beginner), 2 (Intermediate), or 3 (Advanced)"
        });
    };

    // name type validation
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "The 'name' field is required and must be a string",
        });
    };

    // logo id type validation
    if (logoId === undefined || typeof logoId !== "number" || isNaN(logoId)) {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "The 'logoId' field is required and must be a valid number",
        });
    };

    // proceed
    next();
}
