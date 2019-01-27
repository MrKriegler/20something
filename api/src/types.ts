export let DUMMY_GAME: GameData;
export type GameStatus = typeof DUMMY_GAME.status;

export class GameData {
  'id'?: string;
  'ref'?: string;
  'detective'?: string;
  'ninja'?: string;
  'maxQuestionsCount': number;
  'currentQuestionsCount': number;
  'nextTurn': string;
  'answer': string;
  'winner': string;
  'questionsAndAnswers'?: QuestionsAndAnswers[];
  'createdDate': number;
  'enabled': boolean;
  'status':  ('new' | 'inprogress' | 'closed' );
}

export interface AddCorrectAnswerPayload {
  'gameId': string;
  'answer': string;
}
export interface QuestionsAndAnswers {
  'id'?:  string;
  'text': string;
  'type'?: ('question' | 'answer');
  'role': ('ninja' | 'detective' | 'system');
  'author': 'string';
  'createdDate': 'string';
}

export interface GuessAnswerPayload {
  'gameId': string;
  'guess': string;
}

export interface AddMessagePayload {
  'gameId': string;
  'message': QuestionsAndAnswers;
}

export interface GetGamePayload {
  'id':  string;
}

export interface JoinGamePayload {
  'gameId':  string;
  'user': {
    'role': string;
    'username': string
  }
}

export interface GetUserPayload {
  'id':  string;
}

export interface DeleteGamePayload extends GetGamePayload {
}

export interface CreateGamePayload {
  'user': {
    'role': string;
    'username': string
  },
  'game'?: GameData;
}

export interface UpdateGamePayload {
  'id': string;
  'game': GameData;
}
