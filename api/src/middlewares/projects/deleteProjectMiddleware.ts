import { Request, Response, NextFunction } from "express";

import validateId from "../../utils/validateId";

export default function deleteProjectMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    // id must exists
    const errorValidatingId = validateId('id', id, res);
    if( errorValidatingId ) return errorValidatingId;

    // proceed
    next()
};