import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './router';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(errors());
  }
}

export default new App().server;
