import React, {Component} from 'react'
import { connect } from 'react-redux'

import { createGame, getGame } from '../actions/GameActions'
import { Wrapper, CreateGameBox, Title, Button, Input, Label, IntroText, Form } from './styles/DashboardStyles'

class Dashboard extends Component {
  state = {
    username: '',
    answer: ''
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  submitNewGame = async (e) => {
    e.preventDefault()
   const data = {
      "user" : {
        "username": this.state.username,
        "role": "ninja"
      },
      "game": {
        "answer": this.state.answer,
        "nextTurn": "detective"
      }
    }
    sessionStorage.setItem('user', JSON.stringify(data.user))
    this.props.createGame(data)
  }


  render() {
    let disabledNew = true
    if (Boolean(this.props.game.gameCreated)) {
      this.props.history.push(`/game/${this.props.game.id}`)
    }

    if (Boolean(this.state.username) && Boolean(this.state.answer)) {
      disabledNew = false
    }
    return (
      <Wrapper>
        <CreateGameBox>
          <Title>Welcome to 20something!</Title>
          <IntroText>
            20something is a game with the same rules of 20 Questions. 20 Questions is a classic game that has been played since the 19th century.
            To play 20something, the ninja (person holding the secret) thinks of a secret and the detective (person guessing)
            can ask 20 yes/no questions to try see what the secret is. The detective can guess the secret at any point but beware it counts as a question.
          </IntroText>
          <Form>
            <Label>Username</Label>
            <Input type='text' placeholder='Username' onChange={this.handleChange('username')} ></Input>
            <Label>Secret</Label>
            <Input type='text' placeholder='Secret' onChange={this.handleChange('answer')} ></Input>
            <Button primary onClick={this.submitNewGame} disabled={disabledNew}>
              New Game
            </Button>
          </Form>
        </CreateGameBox>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  ...state
})

const mapDispatchToProps = dispatch => ({
  createGame: (data) => dispatch(createGame(data)),
  getGame: (data) => dispatch(getGame(data))
 })

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
