import mongoose from 'mongoose';
import { Cursor } from 'mongodb';
import { GameData } from '@20something/src/types';
import { findNextSequenceNumber, IMongoStoreQuery } from '@20something/lib/common';

export class GameMongoStore {

  public async createGame(game: GameData): Promise<GameData> {
    game.id = `id:game:${await findNextSequenceNumber(mongoose.connection, 'game_id')}`;
    await mongoose
    .connection
    .collection('games')
    .insertOne(game);

    return game;
  }

  public loadGames(query: IMongoStoreQuery): Cursor<GameData> {
    return mongoose
      .connection
      .collection('games')
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit);
  }

  public updateGame = async (game: GameData): Promise<GameData> => {
    let query: any = { id: game.id };

    await mongoose
      .connection
      .collection('games')
      .updateOne(query, { $set: game });

    return game;
  }

}
