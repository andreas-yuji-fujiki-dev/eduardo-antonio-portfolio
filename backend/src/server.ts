import { App } from './app';

const port = Number(process.env.PORT) || 3001;
const server = new App(port);

server.listen();