import { GameMongoStore } from '@20something/src/stores';
import { throwError, ERRORS, payloadRequestToStoreRequest } from '@20something/lib/common';
import { constructGameState, constructCreateGameState } from '@20something/src/states';
import { JoinGamePayload, GameData, GetGamePayload , CreateGamePayload, UpdateGamePayload, AddMessagePayload, GuessAnswerPayload } from '@20something/src/types';

export class GameManager {
  private store: any;

  /**
   *  Initialize the Game Store
   */
  public constructor(){
    this.store = new GameMongoStore();
  }

  /**
   *  Get Game
   */
  public async getGame(payload: GetGamePayload): Promise<GameData> {
    const query = payloadRequestToStoreRequest({ id: payload.id });
    const games = await this.store.loadGames(query).toArray();
    return games.length ? games[0] : null;
  }

  /**
   *  Create Game
   */
  public async createGame(payload: CreateGamePayload): Promise<object> {
    let state = constructCreateGameState();

    const { username, role } = payload.user;
    const game = {
      [role]: username,
      ...payload.game
    }

    state = await state.moveTo('new', game);
    await state.update(game);
    const createdGame = await this.store.createGame(state.game);

    return { success: true, id: createdGame.id };
  }

     /**
    *  Gets Game with ID
    *  Constructs the Game state
    *  Move to new state if needed
    *  Update Game sate
    *  Save to DB
    */
   public async updateGame(payload: UpdateGamePayload): Promise<GameData> {
    const game = await this.getGame(payload);
    if (!game) {
      return throwError(ERRORS.ENOTFOUND, 'Game not found');
    }

    let state = constructGameState(game);
    if (game.status !== payload.game.status) {
      state = await state.moveTo(payload.game.status, payload.game);
    }

    await state.update(payload.game);

    return await this.store.updateGame(state.game);
  }

  /**
    *  Gets Game with ID
    *  Constructs the Game state
    *  Sets detective
    *  Sets game state to inprogress
    *  Save to DB
    */
  public async joinGame(payload: JoinGamePayload): Promise<object> {
    const game = await this.getGame({id: payload.gameId});
    if (!game) {
      return throwError(ERRORS.ENOTFOUND, 'Game not found');
    }

    const { username, role } = payload.user;
    let state = constructGameState(game);
    if (role === 'detective') {
      game.detective = username;
      state = await state.moveTo('inprogress', game);
    }

    await state.update(game);
    return await this.store.updateGame(state.game);
  }

  /**
    *  Gets Game with ID
    *  Constructs the Game state
    *  Check if its the correct turn
    *  If question update questionCount
    *  Add questions/answer
    *  Set next turn
    *  Save to DB
    */
  public async addMessage(payload: AddMessagePayload) {
    const game = await this.getGame({id: payload.gameId});
    if (!game) {
      return throwError(ERRORS.ENOTFOUND, 'Game not found');
    }

    let state = constructGameState(game);

    if (state.game.status === 'new') {
      return throwError(ERRORS.EINVALID, `Could you kindly wait for the detective to join before you start, thanks.`);
    }

    if (state.game.status !== 'inprogress') {
      return throwError(ERRORS.EINVALID, `Although I admire your tenacity the game seems to have ended. Kindly go play another one!`);
    }

    if (state.game.nextTurn !== payload.message.role) {
      return throwError(ERRORS.EINVALID, `Terribly sorry but I have to ask you to please wait you turn.`);
    }

    if (payload.message.type === 'question') {
      game.currentQuestionsCount = state.game.currentQuestionsCount + 1;
    }

    let {currentQuestionsCount, nextTurn} = game;

    if (game.currentQuestionsCount === state.game.maxQuestionsCount + 1 ) {
      state = await state.moveTo('closed', game);
      await state.update(game);
      await this.store.updateGame(state.game);
      return throwError(ERRORS.EINVALID, `${game['ninja']} has used all their questions unlucky! The game has ended.`,);
    }

    game.questionsAndAnswers.push(payload.message)
    nextTurn =  payload.message.role === 'ninja' ? 'detective' : 'ninja';
    game.nextTurn = nextTurn;

    await state.update(game);
    await this.store.updateGame(state.game);
    return {message: payload.message, game: { currentQuestionsCount, nextTurn }};
  }

   /**
    *  Gets Game with ID
    */
   public async guessAnswer(payload: GuessAnswerPayload) {
    const game = await this.getGame({id: payload.gameId});
    let isWin = false;
    if (!game) {
      return throwError(ERRORS.ENOTFOUND, 'Game not found');
    }
    let state = constructGameState(game);

    if (state.game.answer.toLowerCase() === payload.guess.toLowerCase()) {
      isWin = true;
      game.winner = 'detective';
      state = await state.moveTo('closed', game);
    } else {
      game.currentQuestionsCount = state.game.currentQuestionsCount + 1;
    }

    await state.update(game);
    await this.store.updateGame(state.game);
    const {currentQuestionsCount, winner, detective} = game;
    let text = `${detective} guessed that the secret is ${payload.guess}, which is incorrect. Keep guessing!` ;
    if(isWin){
      text = `Winner winner chicken dinner! Well done ${detective} you have guess the secret! The game is now over, thank you.`;
    }
    return this.createSystemMessage(text, { currentQuestionsCount, winner });
  }

  private createSystemMessage(text: string, game) {
    return {
      message: {
        author: 'system',
        text,
        createdDate: new Date().getTime(),
        type: 'system',
        role: 'system'
       },
      game
    };
  }
}
