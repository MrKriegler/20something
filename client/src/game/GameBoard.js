import Messages from '../messages/Messages'
import React, { Component } from 'react'
import { connect } from 'react-redux';

import detective from '../detective.png'
import ninja from '../ninja.png'
import { SubHeaderText, GameWrapper, Title, TextArea, UserImage, Button, Footer} from './styles/GameStyles'
import { sendMessage } from '../actions/MessageActions'


class GameBoard extends Component {

  handleClick = msg => e => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const { gameId } = this.props
    const data = {
      data: {
        text: msg,
        type: user.role === 'detective'? 'questions' : 'answer',
        role: user.role,
        author: user.username
      },
      game: {
        id: gameId
      }
    }
    this.props.sendMessage(data)
  }

  handleTextChange = e  => {
    if (e.key === 'Enter') {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const { gameId } = this.props
      const data = {
        data: {
          text: e.target.value,
          type: user.role === 'detective'? 'question' : 'answer',
          role: user.role,
          author: user.username,
          createdDate: new Date().getTime()
        },
        game: {
          id: gameId
        }
      }
      this.props.sendMessage(data)
      this.cont.value= ''
    }
  }
  renderJoinLink() {
    if (!Boolean(this.props.game.detective)) {
      return(
        <SubHeaderText>To invite a detective to join send them this link http://localhost:1337/join/{this.props.gameId}</SubHeaderText>
      )
    }
    return (<SubHeaderText>A detective has joined. Good luck to you both!</SubHeaderText>)
  }
  render() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const { game, messages } = this.props
    return (<div>
      <GameWrapper>
        <Title>
          <UserImage src={detective} />{game.detective} vs <UserImage src={ninja}/>{game.ninja}
        </Title>
        {this.renderJoinLink()}
        <Messages messages={[...game.questionsAndAnswers, ...messages]}/>
        <Footer>
        {
          user.role === 'detective' ?
            <TextArea ref={ (node) => { this.cont = node } } onKeyPress={this.handleTextChange} placeholder="Type your questions here">
            </TextArea>
          :
            <div>
              <Title smaller>Secret is: {game.answer}</Title>
              <Button onClick={this.handleClick("Yes")}>Yes</Button>
              <Button onClick={this.handleClick("No")}>No</Button>
            </div>
        }
        </Footer>
      </GameWrapper>
    </div>)
  }
}


const mapStateToProps = state => ({
  messages: state.messages,
  game: state.game,
  ...state
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (message) => dispatch(sendMessage(message))
 })

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)

