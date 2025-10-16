import { Response } from "express";

export default function validateString( fieldName = "string", str: any, res: Response ) {
  if (
    typeof str !== "string" ||
    str.trim().length === 0
  ) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: `'${fieldName}' must be a non-empty string`
    });
  }
}
