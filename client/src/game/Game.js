import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameBoard from './GameBoard'
import GameDetails from './GameDetails'

import { Wrapper } from './styles/GameStyles'
import { getMessages } from '../actions/MessageActions'
import { getGame, subscribeToGame, attachGameListener } from '../actions/GameActions'


class Game extends Component {
  state = {
    isLoading: true,
    guess: ''
  }
  componentWillMount() {
    const { match: { params }, attachGameListener, getMessages, subscribeToGame, getGame } = this.props
    attachGameListener()
    getGame(params.id)
    subscribeToGame(params.id)
    getMessages(params.id)
  }

  renderLoading() {
    if (!Boolean(this.props.game.gameReceived)) {
      return (
        <div>
          <h3>Loading....</h3>
        </div>
      )
    }
    return (null)
  }

  renderGameDetails() {
    if (Boolean(this.props.game.gameReceived)) {
      const { match: { params } } = this.props
      return(
        <GameDetails gameId={params.id}  />
      )
    }
    return (null)
  }

  renderGameBoard() {
    if (Boolean(this.props.game.gameReceived)) {
      const { match: { params } } = this.props
      return (<GameBoard gameId={params.id}/>)
    }
    return (null)
  }


  render() {
    return (
      <Wrapper>
        {this.renderLoading()}
        {this.renderGameDetails()}
        {this.renderGameBoard()}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  nextTurn: state.game.nextTurn,
  messages: state.messages,
  game: state.game,
  ...state
})

const mapDispatchToProps = dispatch => ({
  subscribeToGame: (id) => dispatch(subscribeToGame(id)),
  attachGameListener: () => dispatch(attachGameListener()),
  getGame: (id) => dispatch(getGame(id)),
  getMessages: (id) => dispatch(getMessages(id))
 })

export default connect(mapStateToProps, mapDispatchToProps)(Game)
