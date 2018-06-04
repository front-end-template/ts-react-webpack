import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Page404 from 'pages/404'
import { App, Login } from './dynamic-component'

const routes = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route component={Page404} />
      </Switch>
    </div>
  </Router>
)

export default routes
