import { GameState } from '../GameState';
import { GameData, GameStatus } from '@20something/src/types';
import {ERRORS, throwError, MAX_QUESTIONS_COUNT } from '@20something/lib/common';

export class CreateGameState extends GameState {
  public constructor(game: GameData) {
    super(game);
  }

  public async moveTo(targetStatus: GameStatus, data: GameData): Promise<GameState> {
    if (targetStatus !== 'new') {
      throwError(ERRORS.EINVALID, `Illegal state transition from create to ${targetStatus}`);
    }

    this.game.maxQuestionsCount = MAX_QUESTIONS_COUNT;
    this.game.currentQuestionsCount = 0;
    this.game.questionsAndAnswers = [];
    this.game.createdDate = new Date().getTime();
    this.game.winner = '';
    return await super.moveTo(targetStatus, data);
  }
}