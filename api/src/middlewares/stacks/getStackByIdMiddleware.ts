import { Request, Response, NextFunction } from "express";

import validateId from "../../utils/validateId";

export default function getStackByIdMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    // id must be present
    const errorValidatingId = validateId('id', id, res);
    if( errorValidatingId ) return errorValidatingId;
    
    // proceed
    next()
}