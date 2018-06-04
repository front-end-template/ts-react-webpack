import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Route from './routes/index.tsx'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Route />,
  document.getElementById('app'),
)
