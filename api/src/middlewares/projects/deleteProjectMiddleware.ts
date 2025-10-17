import { Request, Response, NextFunction } from "express";

import validateId from "../../utils/validateId";

export default function deleteProjectMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;

        // id must exists
        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        // success case
        next()

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};