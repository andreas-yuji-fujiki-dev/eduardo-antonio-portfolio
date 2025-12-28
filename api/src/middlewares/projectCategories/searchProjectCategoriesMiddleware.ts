import { Request, Response, NextFunction } from "express";

// utils
import validateString from "../../utils/validateString";
import hasMinimumCharacters from "../../utils/hasMinimumCharacters";

export default async function searchProjectCategoriesMiddleware( req: Request, res: Response, next: NextFunction){
    const { q } = req.query;

    const stringQuery = String(q);

    // minimum characters validation
    if ( !hasMinimumCharacters(stringQuery) ) {
        return res.status(400).json({ error: 'Query too short' });
    }
    
    // validate query values
    const errorValidatingQuery = validateString('query', q, res);
    if( errorValidatingQuery ) return errorValidatingQuery;

    // success case
    next()
}