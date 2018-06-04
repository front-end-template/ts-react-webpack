import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
// import { Button } from 'antd'

type State = {
  name?: string;
}

export default class Login extends React.Component<RouteComponentProps<any>, State> {
  constructor (props) {
    super(props)
    this.state = {
      name: 'xgs',
    }
  }
  render () {
    return (
      <div>
        { this.state.name }, Login!
        {/* <Button type="primary">click</Button> */}
        <Link to="/">go to /</Link>
      </div>
    )
  }
}
