import  React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from './dashboard/Dashboard'
import Game from './game/Game'
import JoinGame from './game/JoinGame'

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Dashboard} />
      <Route path="/join/:id" component={JoinGame} />
      <Route path="/game/:id" component={Game} />
    </div>
  </Router>
)

export default AppRouter
