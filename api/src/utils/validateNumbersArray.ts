import { Response } from "express";

export default function validateNumberArray( fieldName = "array", arr: any, res: Response ) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: `'${fieldName}' must be a non-empty array of numbers`,
    })
  };

  const invalidItem = arr.find(
    (n) => isNaN(Number(n)) || !Number.isInteger(Number(n))
  );

  if (invalidItem !== undefined) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: `'${fieldName}' contains an invalid value ('${invalidItem}'). All items must be valid integer numbers.`,
    })
  };
}
