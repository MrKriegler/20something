export const addOwnMessage = data => dispatch => {
  return dispatch({
    type: 'RECEIVE_MESSAGE',
    data
  })
}

export const sendMessage = data => dispatch =>{
  dispatch({
    event: 'SEND_MESSAGE',
    method: 'emit',
    data
  })
}

export const getMessages = gameId => dispatch =>{
  return dispatch({
    event: 'RECEIVE_MESSAGE',
    handle:  data => {
      dispatch({
        type: 'RECEIVE_MESSAGE',
        data: data.data
      })
      dispatch({
        type: 'UPDATED_TURN',
        data: {nextTurn: data.data.role ==='detective' ? 'ninja' : 'detective'}
      })
    }
  })
}