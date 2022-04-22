import * as express from 'express';
import catsRouter from './cats/cats.route';
import { nextTick } from 'process';

// 싱글톤 패턴
class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }
  // route에 관한 middleware
  private setRoute() {
    this.app.use(catsRouter);
  }

  // * middleware setting
  private setMiddleware() {
    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next();
    });

    //* json middleware
    this.app.use(express.json());

    this.setRoute();

    //* 404 error middleware
    this.app.use((req, res, next) => {
      console.log('this is logging middleware');
      res.send({ error: '404 not found error' });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(3000, () => {
      console.log('server is on...');
    });
  }
}

//초기화
function init() {
  //싱글톤 인스턴스
  const server = new Server();
  server.listen();
}

init();
