import React, {Component} from 'react'
import { connect } from 'react-redux';
import { joinGame } from '../actions/GameActions'
import { Title, Form, Label, Input, Button} from './styles/JoinGameStyles'

class JoinGame extends Component {
  state = {
    username: ''
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  joinGame = async (e) => {
    e.preventDefault()
    const { match: { params }, joinGame } = this.props
    const data = {
      "user" : {
        "username": this.state.username,
        "role": "detective"
      },
      "gameId": params.id
    }
    sessionStorage.setItem('user', JSON.stringify(data.user))
    joinGame(data)
   }

  render() {
    if (Boolean(this.props.game.gameJoined)) {
      this.props.history.push(`/game/${this.props.match.params.id}`)
    }
    return (
      <div>
        <Title>Welcome to 20something!</Title>
        <Form>
          <Label>Username</Label>
          <Input type='text' placeholder='Username' onChange={this.handleChange('username')} ></Input>
          <Button onClick={this.joinGame}>
              Join Game
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  ...state
})

const mapDispatchToProps = dispatch => ({
  joinGame: (data) => dispatch(joinGame(data))
 })

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame)