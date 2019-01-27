import axios from 'axios';

export const endGetGame = data => {
  return {
      type : 'END_GET_GAME',
      isLoading: false,
      data
  }
}

export const endCreateGame = data =>  {
  return {
      type : 'END_CREATE_GAME',
      finishedCreating: true,
      data
  }
}

export const createGame = data => dispatch => {
    let url = `${process.env['REACT_APP_API_URL']}/api/v1/games`
    axios.post(url, data).then(
        (response) => {
            const data = response.data
            dispatch(endCreateGame(data.data))
        },
        (err) => {
            console.log(err)
        }
    )
}

export const getGame = id => dispatch => {
  let url = `${process.env['REACT_APP_API_URL']}/api/v1/games/${id}`
  axios.get(url).then(
      (response) => {
          const data = response.data
          dispatch(endGetGame(data.data))
      },
      (err) => {
          console.log(err)
      }
  )
}

export const attachGameListener = () => dispatch => {
  return dispatch({
    event: 'UPDATED_GAME',
    handle:  data => {
      dispatch({
        type: 'UPDATED_GAME',
        data: data.data
    })}
  })
}

export const guessAnswer = data => dispatch => {
  return dispatch({
    event: 'GUESS_ANSWER',
    method: 'emit',
    data: data
  })
}

export const subscribeToGame = (gameId) => dispatch => {
  return dispatch({
    event: 'SUBSCRIBE_GAME',
    method: 'emit',
    data: {gameId}
  })
}

export const joinGame = data => dispatch => {
  dispatch({
    event: 'JOIN_GAME',
    method: 'emit',
    data
  });
  dispatch({
    type: 'JOINED_GAME'
  })
}
