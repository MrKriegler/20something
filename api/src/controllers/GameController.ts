import { runRequest } from '@20something/lib/common';
import { Router, Request, Response, NextFunction } from 'express';
import { GameManager } from '../managers/GameManager';

/*
* Class methods use arrow methods for 'this' fix
* https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript
*/

export class GameController {
  router: Router;
  manager: any;
  /**
   *  Initialize Controller
   */
  constructor() {
    this.manager = new GameManager();
    this.router = Router();
    this.init();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    await runRequest(res,
      async () => await this.manager.getGame({id: req.params.id})
    );
  }

  public post = async (req: Request, res: Response, next: NextFunction) => {
    await runRequest(res,
      async () => await this.manager.createGame(req.body)
    );
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/:id', this.get);
    this.router.post('/', this.post);
  }
}

// Create the GameController, and export its configured Express.Router
const controller = new GameController();
const router = controller.router;

export default router;
