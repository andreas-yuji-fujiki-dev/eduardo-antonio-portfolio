import { Response } from "express";

export default function validateString(str: any, res: Response, fieldName = "string") {
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
