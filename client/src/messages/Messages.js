import React, { Component } from 'react'
import Message from './Message'
import { MessageList } from './styles/MessageStyles'

class Messages extends Component {
  componentDidUpdate = () => {
    this.cont.scrollTop = this.cont.scrollHeight
  }
  render() {
    const { messages } = this.props
    return (
      <MessageList  ref={ (node) => { this.cont = node } }>
        {messages.map((m, i) => <Message key={i} role={m.role} text={m.text} createdDate={m.createdDate}/>)}
      </MessageList>
    )
  }
}

export default Messages