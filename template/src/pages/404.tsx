import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default function Page404 (props: RouteComponentProps<any>) {
  return (
    <div>
      404 Not Found!{props.location.state && ''}
    </div>
  )
}
