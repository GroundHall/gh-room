import Handlers from './handlers';

import {
  RoomModel,
  RoomModelRequired
} from './db/model';

const routes = [
  {
    method: 'GET',
    path: '/rooms',
    handler: Handlers.getAllRooms
  },
  {
    method: 'GET',
    path: '/rooms/{roomId}',
    handler: Handlers.getRoom
  },
  {
    method: 'POST',
    path: '/rooms',
    handler: Handlers.createRoom,
    config: {
      validate: {
        payload: RoomModelRequired
      }
    }
  },
  {
    method: 'PUT',
    path: '/rooms/{roomId}',
    handler: Handlers.putRoom,
    config: {
      validate: {
        payload: RoomModelRequired
      }
    }
  },
  {
    method: 'PATCH',
    path: '/rooms/{roomId}',
    handler: Handlers.patchRoom,
    config: {
      validate: {
        payload: RoomModel
      }
    }
  },
  {
    method: 'DELETE',
    path: '/rooms/{roomId}',
    handler: Handlers.delelteRoom
  }
];

export default routes;
