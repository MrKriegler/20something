export default (state = [], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
    case 'RECEIVE_MESSAGE':
      return state.concat([{
        author : action.data.author,
        text: action.data.text,
        type: action.data.type,
        createdDate: action.data.createdDate,
        role: action.data.role
      }])
   default:
    return state
  }
 }