import { GameState } from '../GameState';
import { GameData, GameStatus } from '@20something/src/types';
import {ERRORS, throwError } from '@20something/lib/common';

export class InprogressGameState extends GameState {
  public constructor(game: GameData) {
    super(game);
  }

  public async moveTo(targetStatus: GameStatus, data: GameData): Promise<GameState> {
    switch (targetStatus) {
      case 'closed':
        break;
      default:
        throwError(ERRORS.EINVALID, `Illegal state transition from inprogress to ${targetStatus}`);
    }

    return await super.moveTo(targetStatus, data);
  }
}