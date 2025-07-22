import createDOMPurify from 'dompurify';
import { JSDOM, type DOMWindow } from 'jsdom';
import { Request, Response, NextFunction } from 'express';

const window = new JSDOM('').window as unknown as DOMWindow;
const DOMPurify = createDOMPurify(window);

function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    return DOMPurify.sanitize(value);
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (typeof value === 'object' && value !== null) {
    const sanitizedObject: any = {};
    for (const key in value) {
      sanitizedObject[key] = sanitizeValue(value[key]);
    }
    return sanitizedObject;
  }
  return value;
}

export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  next();
}
