import path from 'path';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import RouteManager from './routes/RouteManager';
import DB from './models/engine/DBStorage';
import deserializeUser from './middleware/deserializeUser';
import BcryptUtil from './utils/BcryptUtil';
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
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(deserializeUser);
    new RouteManager(this.app);
  }

  settings() {
    BcryptUtil.hashPassword('admin').then((hash) => console.log(hash));
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
