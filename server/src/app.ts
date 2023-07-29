import path from 'path';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import RouteManager from './routes/RouteManager';
import DB from './models/engine/DBStorage';
dotenv.config();

class App {
  public app!: Application;
  public port!: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.middlewares();
    this.settings();
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(express.json({}));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    new RouteManager(this.app);
  }

  settings() {
    DB.sync({ alter: false });
    this.app.listen(this.port, () =>
      console.log(`Server is running on PORT ::${this.port}`)
    );
  }
}

function run() {
  const app = new App();
}

if (require.main === module) {
  run();
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
