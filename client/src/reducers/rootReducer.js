import { combineReducers } from 'redux'
import gameReducer  from './gameReducer'
import messageReducer from './messageReducer'
export default combineReducers({
  game: gameReducer,
  messages: messageReducer
})