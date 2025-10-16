import { Request, Response, NextFunction } from "express";

export default function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  
  const { user, password } = req.body;

  // check if there is some missing field
  const isMissingSomeField = 
    !user 
    || !password 
    || String(user).trim().length === 0 
    || String(password).trim().length === 0;

  if ( isMissingSomeField )
    return res.status(400).json({
      status: `400 - Bad request`,
      error: `Missing fields. You must provide 'user' and 'password', both in string type`,
  });

  // validate field types
  const someFieldHaveInvalidType = 
    typeof user !== "string" 
    || typeof password !== "string";

  if( someFieldHaveInvalidType ) {
    return res.status(400).json({
      status: "400 - Bad request",
      message: "The 'user' and 'password' fields must be in string type"
    });
  };

  // proceed
  next();
}
