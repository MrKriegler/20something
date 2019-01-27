export default (state = {}, action) => {
  switch (action.type) {
    case 'END_GET_GAME':
      return {
        ...state,
        gameReceived : true,
        ...action.data
      }
    case 'END_CREATE_GAME':
      return {
        ...state,
        gameCreated : true,
        id: action.data.id
      }
    case 'UPDATED_GAME':
      return {
        ...state,
        gameReceived: true,
        ...action.data
      }
    case 'UPDATED_TURN':
      const data = {
        ...state,
        ...action.data
      }
      return data;
    case 'JOINED_GAME':
      return  {
        ...state,
        gameJoined: true,
      }
    case 'JOIN_GAME':
    default:
      return state
    }
 }