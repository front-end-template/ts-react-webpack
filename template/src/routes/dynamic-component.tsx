import * as React from 'react'
import * as Loadable from 'react-loadable'
import delayLoad from 'lib/delayLoadForLoadable'

// const Loading = () => <div>Loading...</div>
function Loading (props: { error: boolean, pastDelay: boolean }) {
  if (props.error) {
    return <div>Error! </div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  }
  return null
}
const loaderLogin = () => import('pages/Login')

export const Login = Loadable({
  loader: () => delayLoad(1000)(loaderLogin),
  loading: Loading,
})

export const App = Loadable({
  loader: () => import('pages/App'),
  loading: Loading,
})
