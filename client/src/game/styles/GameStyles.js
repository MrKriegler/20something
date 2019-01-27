import styled from 'styled-components'

export const Title = styled.h1`
  ${props => props.smaller ? ' font-size: 1em;' : 'font-size: 1.5em;'}
  text-align: center;
  color: palevioletred;
  ${props => props.smaller ? 'margin:5px' : ''}
`

export const UserImage = styled.img`
  display: inline-block;
  height: 40px;
  width: auto;
`

export const Wrapper = styled.section`
  display:flex;
  justify-content:center;
  position:relative;
  width:100%;
`
export const GameDetails = styled.div`
  width:200px;
  margin-right:20px;
  background: white;
  height:400px;
  padding:10px;
  border-radius:8px;
  display:block;
`

export const GameDetailsBlock = styled.div`
  display:flex;
  padding: 5px;
  justify-content:center;
  align-items: center;
`
export const GameWrapper = styled.div`
  position:relative;
  font-size:1.5em;
  text-align:center;
  width:500px;
  height:80vh;
  padding:10px;
  background: white;
  border-radius:8px;
`

export const TextArea = styled.input`
  position:absolute;
  bottom:0;
  left:0;
  background:white;
  border:none;
  outline:none;
  height:30px;
  font-size:28px;
  color:palevioletred;
  width:100%;
  overflow:hidden;
  &::placeholder {
    color:palevioletred;
  }
`

export const Footer = styled.div`
  position:absolute;
  bottom:10px;
  left:10px;
  width:90%;
  background:white;
`

export const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: .8em;
  padding: 0.25em 1em;
  margin-left:10px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  outline: none;
  &:active {
    background: ${props => props.primary ? "white" : "palevioletred"};
    color: ${props => props.primary ? "palevioletred" : "white"};
  }
`

export const SubHeaderText = styled.p`
  color:palevioletred;
`
