import * as bodyParser from 'body-parser';

import { configureMongoStores, LOGGER_LEVEL, API_BASE_ROUTE, API_VERSION } from '@20something/lib/common';

import express from 'express';
import logger from 'morgan';

import GameController from './controllers/GameController';

const baseRoute = `/${API_BASE_ROUTE}/${API_VERSION}`;


class Server {
    public express: express.Application;

    /**
     * Initialize server
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.database();
    }

    /**
     * Configure database.
     */
    private database(): void {
      configureMongoStores();
    }

    /**
     * Configure Express middleware.
     */
    private middleware(): void {
        this.express.use(logger(LOGGER_LEVEL));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use( (req, res, next) => {
          // local Cors issues
          // @Todo: Change this to a ENV switch
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
          next();
      });
    }

    /**
     * Configure API endpoints.
     */
    private routes(): void {
        this.express.use(`${baseRoute}/games`, GameController);
    }
}

export default new Server().express;
