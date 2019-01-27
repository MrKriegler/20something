import React, { Component } from 'react';
import styled from 'styled-components'
import './App.css';
import AppRouter from './AppRouter'

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  height:100vh;
`;

class App extends Component {
  render() {
    return (
      <Wrapper className="App">
        <AppRouter />
      </Wrapper>
    );
  }
}

export default App;
