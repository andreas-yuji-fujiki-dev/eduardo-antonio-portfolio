import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import { AppTypes } from './types/AppTypes';

import projectsRouter from './routes/private/projects';
import imagesRouter from './routes/private/images';
import stacksRouter from './routes/private/stacks';
import authRouter from './routes/public/auth';

import { sanitizeMiddleware } from './middlewares/security/sanitizeMiddleware';

export class App {
  public app: Application;
  private port: number;

  constructor({ port = 3000 }: AppTypes) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routers();

    this.app.use(sanitizeMiddleware)
  }

  private middlewares(): void {
    // headers security
    this.app.use(helmet());

    // cors config for specific origins
    this.app.use(cors({
      origin: ['http://localhost:3001'],
      credentials: true,
    }));

    // brute force protection
    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit by ip
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests from this IP, please try again later.',
    }));

    // sanitize inputs against xss atacks
    this.app.use(xss());

    // express json allowed on body
    this.app.use(express.json());
  }

  // registering routes
  private routers(): void {
    this.app.use('/projects', projectsRouter);
    this.app.use('/images', imagesRouter);
    this.app.use('/stacks', stacksRouter);
    this.app.use('/auth', authRouter);
  }

  // init function
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`
        Server running on http://localhost:${this.port}
        Happy hacking! =)
      `);
    });
  }
}