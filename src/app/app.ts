import Koa from 'koa';
import 'reflect-metadata';
import { createKoaServer, useContainer as routingUseContainer } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { authorizationChecker } from './middlewares/authorizationChecker.middleware';
import koaSwagger from 'koa2-swagger-ui';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
@Service()
export class App {
  private application: Koa;

  public constructor() {

    routingUseContainer(Container);

    this.application = createKoaServer({
      development: DEVELOPMENT,
      routePrefix: '/api/v1',
      cors: true,
      controllers: [__dirname + '/../app/controllers/**/*.controller.js'],
      middlewares: [__dirname + '/../app/middlewares/**/*.middleware.js'],
      authorizationChecker,
      validation: { validationError: { target: false } }
    });

    this.application.use(koaSwagger({
      routePrefix: '/docs/api', // host at /swagger instead of default /docs
      swaggerOptions: {
        url: 'http://localhost:3000/api/v1/docs/swagger-json', // example path to json
      },
    }));
  }

  public getApp(): Koa {
    return this.application;
  }
}
