import { GameState } from '../GameState';
import { GameData, GameStatus } from '@20something/src/types';
import {ERRORS, throwError, MAX_QUESTIONS_COUNT } from '@20something/lib/common';

export class NewGameState extends GameState {
  public constructor(game: GameData) {
    super(game);
  }

  public async moveTo(targetStatus: GameStatus, data: GameData): Promise<GameState> {
    if (targetStatus !== 'inprogress') {
      throwError(ERRORS.EINVALID, `Illegal state transition from new to ${targetStatus}`);
    }
    return await super.moveTo(targetStatus, data);
  }
}