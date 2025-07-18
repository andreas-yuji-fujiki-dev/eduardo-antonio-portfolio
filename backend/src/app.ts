import express, { Application } from 'express';

export class App {
  public app: Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`
        
        Servidor running on http://localhost:${this.port}
        Happy hacking! =)
        
      `);
    });
  }
}
