import { Request, Response, NextFunction } from "express";
import { ProjectRequestBody } from "../../types/projectRequestBody";

export default function registerProjectMiddleware(
  req: Request<{}, {}, ProjectRequestBody>,
  res: Response,
  next: NextFunction
) {

  const { 
    name,
    description,
    more_info,
    deploy_link,
    repository_link,
  } = req.body;

  // all this fields are required
  const isMissingField = 
    !name 
    || !description
    || !more_info 
    || !deploy_link 
    || !repository_link;

  if ( isMissingField ) {
    return res.status(422).json({
      status: "422 - Unprocessable Entity",
      error: "Some required field is missing, make sure that you have informed these: name, description, more_info, deploy_link, repository_link."
    });
  }

  // proceed
  next();
}