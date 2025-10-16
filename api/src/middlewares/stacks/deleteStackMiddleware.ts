import { Request, Response, NextFunction } from "express";

import validateId from "../../utils/validateId";

export default function deleteStackMiddleware(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // id type validation
    const errorValidatingId = validateId('id', id, res);
    if( errorValidatingId ) return errorValidatingId;

    // proceed
    next()
}
