import { runSocketRequest } from '@20something/lib/common';
import { GameManager } from '@20something/src/managers/GameManager';

export class GameWebSocketServer {

  manager: any;
  /**
   *  Initialize Controller
   */
  constructor() {
    this.manager = new GameManager();
  }

  subscribe = async (io: any, socket: any, message: any) => {
    socket.join(message.gameId);
    socket.emit('SUBSCRIBED_GAME', {})
  }

  joinGame = async (io: any, socket: any, message: any) => {
    socket.join(message.gameId);
    await runSocketRequest(socket, 'UPDATED_GAME',
      async () => {
        const result =  await this.manager.joinGame(message);
        io.in(message.gameId).emit('UPDATED_GAME', { data: result });
      }
    )
  }

  sendMessage = async (io: any, socket: any, message: any) => {
    await runSocketRequest(socket, 'UPDATED_GAME',
      async () => {
        const result =  await this.manager.addMessage({message: message.data, gameId: message.game.id});
        io.in(message.game.id).emit('RECEIVE_MESSAGE', { data: result.message });
        io.in(message.game.id).emit('UPDATED_GAME', { data: result.game });
      }
    )
  }

  guessAnswer = async(io: any, socket: any, message: any) => {
    await runSocketRequest(socket, 'UPDATED_GAME',
      async () => {
        const result =  await this.manager.guessAnswer(message);
        io.in(message.gameId).emit('RECEIVE_MESSAGE', { data: result.message });
        io.in(message.gameId).emit('UPDATED_GAME', { data: result.game });
      }
    )
  }

  onSocketConnection = (io: any, socket: any): void => {
    socket.on('SUBSCRIBE_GAME', (message) => this.subscribe(io, socket, message));
    socket.on('JOIN_GAME', (message) => this.joinGame(io, socket, message));
    socket.on('SEND_MESSAGE', (message) => this.sendMessage(io, socket, message));
    socket.on('GUESS_ANSWER', (message) => this.guessAnswer(io, socket, message));
  }

}