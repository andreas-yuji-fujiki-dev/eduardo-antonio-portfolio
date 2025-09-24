// express
import express, { Application } from 'express';

// app types
import { AppTypes } from './types/AppTypes';

// security
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { sanitizeMiddleware } from './middlewares/security/sanitizeMiddleware';

// routers
import slashRouter from './routers/public/slash';
import projectsRouter from './routers/private/projects';
import imagesRouter from './routers/private/images';
import stacksRouter from './routers/private/stacks';
import authRouter from './routers/public/auth';

// docs
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swaggerConfig';

// app class
export class App {
  public app: Application;
  private port: number;

  constructor({ port = 3000 }: AppTypes) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routers();

    this.app.use(sanitizeMiddleware);
  };

  private middlewares(): void {
    // headers security
    this.app.use(helmet());

    // cors config for specific origins 
    this.app.use(cors({
      origin: [
        'http://localhost:3001', // backend 
        'http://localhost:3000', // portfolio
        'http://localhost:3002'  // panel
      ],
      credentials: true,
      exposedHeaders: ['Content-Type', 'Authorization'],
    }));

    // api config to serve image files
    this.app.use('/uploads', express.static('uploads'));

    // brute force protection
    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit by ip
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests from this IP, please try again later.',
    }));

    // express json allowed on body
    this.app.use(express.json());
  };

  // registering routes
  private routers(): void {
    // swagger
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // app routers
    this.app.use('/', slashRouter)
    this.app.use('/projects', projectsRouter);
    this.app.use('/images', imagesRouter);
    this.app.use('/stacks', stacksRouter);
    this.app.use('/auth', authRouter);
  };

  // init function
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`
        Server running on http://localhost:${this.port}
        Happy hacking! =)
      `);
    });
  };
};