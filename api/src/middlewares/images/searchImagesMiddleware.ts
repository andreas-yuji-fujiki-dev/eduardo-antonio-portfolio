import { Request, Response, NextFunction } from "express";
import validateString from "../../utils/validateString";

export default async function searchImagesMiddleware( req: Request, res: Response, next: NextFunction){
    const { q } = req.query;
    
    // validate query values
    const errorValidatingQuery = validateString('query', q, res);
    if( errorValidatingQuery ) return errorValidatingQuery;

    // success case
    next()
}