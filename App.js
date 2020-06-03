// @flow
import 'react-native-gesture-handler'
import React from 'react'
import { NativeModules, Platform, YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import _ from 'lodash'
import { initializeStore } from './redux/ActionCreators'
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainComponent'
import Welcome from './components/WelcomeComponent'

YellowBox.ignoreWarnings(['Setting a timer', 'color was given a value of '])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

type Props = {
  FCMToken: string
}

const { persistor, store } = ConfigureStore()

class App extends React.Component<Props> {
  componentDidMount () {
    Platform.OS === 'ios'
      ? store.dispatch(initializeStore(this.props.FCMToken))
      : Promise.resolve(NativeModules.FCM.getToken())
        .then(
          FCMToken => store.dispatch(initializeStore(FCMToken)),
          error => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch(error => console.log(error.message))
  }

  render () {
    return (
      <Provider store = { store }>
        <PersistGate loading = { <Welcome /> } persistor = { persistor }>
          <Main />
        </PersistGate>
      </Provider>
    )
  }
}

export default App