import { GameData, GameStatus } from '@20something/src/types';
import { GAME_STATE_CONSTRUCTORS} from './consts';

/**
 * Construct create game state
*/
export function constructCreateGameState(): GameState {

  const Constructor = GAME_STATE_CONSTRUCTORS && GAME_STATE_CONSTRUCTORS['create'];
  if (!Constructor) {
    throw new Error(`Unrecognized game or status: create`);
  }

  return new Constructor(<any> { status: 'status' });
}

/**
 * Construct game state
*/
export function constructGameState(
  game: GameData
): GameState {
  const Constructor = GAME_STATE_CONSTRUCTORS && GAME_STATE_CONSTRUCTORS[game.status];

  if (!Constructor) {
    throw new Error(`Unrecognized game or status:${game.status}`);
  }

  return new Constructor(game);
}

/**
 * Base game state
*/
export abstract class GameState {
  public constructor(
    public game: GameData
  ) {}

  public async onExit(targetStatus: GameStatus): Promise<void> {
    return void 0;
  }

  public async onEnter(sourceStatus: GameStatus): Promise<void> {
    return void 0;
  }

  public async moveTo(targetStatus: GameStatus, data: GameData): Promise<GameState> {
    const sourceStatus = this.game.status;
    await this.onExit(targetStatus);
    this.game.status = targetStatus;
    const newState = constructGameState(this.game);
    await newState.onEnter(sourceStatus);
    return newState;
  }

  public async update(data: GameData): Promise<void> {
    //sanitize input
    (<Array<keyof GameData>> ['nextTurn', 'detective', 'ninja', 'answer', 'waitingFor'])
      .forEach(property => {
        if (property in data) {
          this.game[property] = data[property];
        } else {
          delete this.game[property];
        }
      });
  }
}

