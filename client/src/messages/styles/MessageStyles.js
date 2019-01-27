import styled from 'styled-components'

export const Wrapper = styled.section`
  display:flex;
  align-items: center;
  overflow:hidden;
  background-color:white;
  margin: 15px;
  padding-left:10px;
  border-radius:10px;
`

export const UserImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`

export const MessageText = styled.p`
  padding-left:10px;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  flex: 1 1 auto;
  color:palevioletred
`

export const Time = styled.p`
  color:#bbb;
  font-size:.5em;
`

export const MessageList = styled.div `
  max-height: 72%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: palevioletred;
  }
`