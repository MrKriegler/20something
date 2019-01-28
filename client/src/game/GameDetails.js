import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import detective from '../detective.png'
import ninja from '../ninja.png'
import { sendMessage, getMessages, addOwnMessage, } from '../actions/MessageActions'
import { GameDetails, GameDetailsBlock, Title, UserImage, Button} from './styles/GameStyles'
import { getGame, joinGame, subscribeToGame, attachGameListener, guessAnswer } from '../actions/GameActions'


class GameBoard extends Component {

  state = {
    guess: ''
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleGuessAnswer = () => e => {
    const { gameId } = this.props
    const { guess } = this.state
    this.props.guessAnswer({guess, gameId: gameId})
  }

  handleNewGame = () => e => {
    this.props.history.push('/')
  }

  render() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const { game, nextTurn } = this.props

    return (
    <GameDetails>
      <Title>Game Details</Title>
      <h4>Turn</h4>
      <GameDetailsBlock>
        <UserImage src={ nextTurn === 'detective' ? detective : ninja} />
      </GameDetailsBlock>
      <h4>Question count:</h4>
      <GameDetailsBlock>
        {game.currentQuestionsCount}
      </GameDetailsBlock>
      <h4>Questions left</h4>
      <GameDetailsBlock>
        {game.maxQuestionsCount - game.currentQuestionsCount}
      </GameDetailsBlock>
      {
        user.role === 'detective' ?
        <div>
          <GameDetailsBlock>
            <input onChange={this.handleChange('guess')} />
          </GameDetailsBlock>
          <GameDetailsBlock>
            <Button onClick={this.handleGuessAnswer()} >Guess secret</Button>
          </GameDetailsBlock>
        </div> : ''
      }
      <GameDetailsBlock>
            <Button onClick={this.handleNewGame()} >New game</Button>
      </GameDetailsBlock>
    </GameDetails>
    )
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
  sendMessage: (message) => dispatch(sendMessage(message)),
  getMessages: (id) => dispatch(getMessages(id)),
  addOwnMessage: (data) => dispatch(addOwnMessage(data)),
  guessAnswer: (data) => dispatch(guessAnswer(data)),
  joinGame: (id) => dispatch(joinGame(id))
 })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GameBoard))

