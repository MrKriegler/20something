import styled from 'styled-components'

export const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`

export const Button = styled.button`
background: ${props => props.primary ? "palevioletred" : "white"};
color: ${props => props.primary ? "white" : "palevioletred"};
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
outline: none;
&:active {
  background: ${props => props.primary ? "white" : "palevioletred"};
  color: ${props => props.primary ? "palevioletred" : "white"};
}
`

export const Input = styled.input`
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
background: white;
color: palevioletred;
height:20px;
margin: .5em 1em;
outline: none;
`

export const Label = styled.label`
`

export const Form = styled.form`
display:flex;
flex-direction: column;
width: 300px;
margin:0 auto;
`