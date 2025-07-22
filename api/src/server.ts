import { App } from './app';

const server = new App({ port: Number(process.env.PORT) || 3001 });
server.listen();