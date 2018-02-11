import Boom from 'boom';
import dateformat from 'dateformat';
import env from './env.config';
import r from './db/config';
import {
  ReplyPromiseResponse
} from './decorators';

class Handlers {
  @ReplyPromiseResponse
  static getAllRooms() {
    return r.table(env.DB_TABLE_NAME);
  }

  @ReplyPromiseResponse
  static getRoom(request) {
    const { roomId } = request.params;
    return r.table(env.DB_TABLE_NAME).get(roomId);
  }

  @ReplyPromiseResponse
  static createRoom(request) {
    const { payload } = request;
    return r.table(env.DB_TABLE_NAME).insert(
      r.expr(payload).merge({
        createdAt: r.now()
      }),
      // This tells rethinkdb that changes should be return
      {returnChanges: true}
    )
  }

  @ReplyPromiseResponse
  static putRoom(request) {
    const { roomId } = request.params;
    const { payload } = request;
    payload.id = roomId;
    return r.table(env.DB_TABLE_NAME)
      .get(roomId)
      .replace(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static patchRoom(request) {
    const { roomId } = request.params;
    const { payload } = request;
    payload.id = roomId;
    return r.table(env.DB_TABLE_NAME)
    .get(roomId)
    .update(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static delelteRoom(request) {
    const { roomId } = request.params;
    return r.table(env.DB_TABLE_NAME)
      .get(roomId)
      .delete({returnChanges: true})
  }
}

export default Handlers;
