import { Request, Response, NextFunction } from "express";

export default function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(400).json({
      status: "400 Bad Request",
      error: "Request body is missing",
    });
  }

  const { user, password } = req.body;

  const isMissingSomeField = !user || !password;
  const missingField = !user ? "user" : "password";

  if (isMissingSomeField)
    return res.status(422).json({
      status: `422 Unprocessable Entity.`,
      error: `Missing ${missingField}!`,
    });

  next();
}
