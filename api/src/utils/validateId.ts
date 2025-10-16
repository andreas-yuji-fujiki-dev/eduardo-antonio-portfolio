import { Response } from "express";

export default function validateId( id: string | number, res: Response ){
    const invalidId = 
        String(id).trim().length === 0 
        || isNaN(Number(id))
        || !Number.isInteger(Number(id))
        || typeof Number(id) !== 'number'
        || Number(id) <= 0
    
    if(invalidId)
        return res.status(400).json({
            status: "400 - Bad request",
            message: "'id' must be a valid integer and positive number"
        })
}