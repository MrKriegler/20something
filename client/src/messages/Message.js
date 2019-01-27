import React, { Component } from 'react'
import Moment from 'react-moment'
import detective from '../detective.png'
import ninja from '../ninja.png'
import system from '../system.png'
import { Wrapper, UserImage, MessageText, Time } from './styles/MessageStyles'

const images = {
  'detective': detective,
  'ninja': ninja,
  'system': system
}

class Message extends Component {
  render() {
    const { text, role, createdDate } = this.props
    const userImage = images[role]
    return (
      <Wrapper>
        <UserImage src={userImage}></UserImage>
        <MessageText>{text}</MessageText>
        <Time><Moment format="HH:mm" >{createdDate}</Moment></Time>
      </Wrapper>
    )
  }
}

export default Message