import {ERRORS, throwError } from '@20something/lib/common';
import { GameData, GameStatus } from '@20something/src/types';
import { GameState } from '../GameState';

export class ClosedGameState extends GameState {
  public constructor(task: GameData) {
    super(task);
  }

  public async moveTo(targetStatus: GameStatus, data: GameData): Promise<GameState> {
    throwError(ERRORS.EINVALID, 'You cannot move to any state after the game has been completed');
    return await super.moveTo(targetStatus, data);
  }
}