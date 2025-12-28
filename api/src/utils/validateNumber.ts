import { Response } from "express";

export default function validateNumber(
  fieldName: string,
  value: string | number,
  type: 'integer' | 'float',
  res: Response
) {
  const numericValue = Number(value);

  const baseInvalid =
    value === undefined ||
    value === null ||
    String(value).trim().length === 0 ||
    Number.isNaN(numericValue) ||
    numericValue <= 0;

  const invalidInteger =
    type === 'integer' &&
    (baseInvalid || !Number.isInteger(numericValue));

  const invalidFloat =
    type === 'float' &&
    (baseInvalid || Number.isInteger(numericValue));

  if (invalidInteger) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: `'${fieldName}' must be a valid positive integer`
    });
  }

  if (invalidFloat) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: `'${fieldName}' must be a valid positive float`
    });
  }
}