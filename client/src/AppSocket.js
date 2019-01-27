import io from 'socket.io-client';

export default function socketMiddleware() {
  const socket = io('http://localhost:3001', {
    path: '/ws/games'
  })

  return ({ dispatch }) => next => (action) => {
    console.log(action);
    if (typeof action === 'function') {
      return next(action)
    }

    const {
      event,
      leave,
      handle,
      method,
      data,
      ...rest
    } = action

    if (data && data.statusCode === 400) {
      return dispatch({
        type: 'RECEIVE_MESSAGE',
        data: {
          author: 'system',
          text: data.message,
          createdDate: new Date().getTime(),
          role: 'system'
        }
      })
    }

    if (!event) {
      return next(action);
    }
    if (leave) {
      socket.removeListener(event);
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({ type: handle, result, ...rest })
    }
    if(method === 'emit') {
      return socket.emit(event, data)
    }
    return socket.on(event, handleEvent)
  }
}