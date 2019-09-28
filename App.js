import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import _ from 'lodash'
import { ConfigureStore } from './redux/configureStore'
import Main from './components/MainComponent'

YellowBox.ignoreWarnings(['Setting a timer'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

const store = ConfigureStore()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
