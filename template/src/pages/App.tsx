import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Button, Input, TreeSelect } from 'antd'

type State = {
  name?: string;
  age?: number;
  value?: string;
}

const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
}]

export default class App extends React.Component<RouteComponentProps<any>, State> {
  constructor (props) {
    super(props)
    this.state = {
      name: 'xgs',
      age: 25,
      value: '',
    }
  }

  onChange = value => {
    this.setState({ value })
  }

  render () {
    return (
      <div>
        { this.state.name } { this.state.age }, App!
        <Button>点击</Button>
        <Button>hhh</Button>
        <Button type="primary">App</Button>
        <Input placeholder="Basic usage" />
        <Link to="/login">go to login</Link>
        <TreeSelect
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="Please select"
          treeDefaultExpandAll
          onChange={this.onChange}
        />
      </div>
    )
  }
}
