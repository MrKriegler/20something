import { GameData, GameStatus } from '@20something/src/types';
import { GameState } from './GameState';
import { CreateGameState } from './create';
import { ClosedGameState } from './closed';
import { NewGameState } from './new';
import { InprogressGameState } from './inprogress';

export const GAME_STATE_CONSTRUCTORS: {
  [state: string]: new (game: GameData) => GameState
} = {
  'create': CreateGameState,
  'new': NewGameState,
  'inprogress': InprogressGameState,
  'closed': ClosedGameState
};
