import projectsRouter from './routes/private/projects';
import stacksRouter from './routes/private/stacks';
import authRouter from './routes/public/auth';

import express, { Application } from 'express';
import { AppTypes } from './types/AppTypes';

export class App {
  public app: Application;
  private port: number;

  constructor( { port = 3000 } : AppTypes ) {
    this.app = express();
    this.port = port;

    this.app.use(express.json());

    this.routers();
  };

  private routers(): void {
    this.app.use('/projects', projectsRouter)
    this.app.use('/stacks', stacksRouter)
    this.app.use('/auth', authRouter)
  };

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`
        
        Server running on http://localhost:${this.port}
        Happy hacking! =)
        
      `);
    });
  };
};
