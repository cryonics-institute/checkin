/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React from 'react'
import { NativeModules, Platform, YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import _ from 'lodash'
import { initializeStore } from './redux/ActionCreators'
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/MainComponent'

YellowBox.ignoreWarnings(['Setting a timer', 'color was given a value of '])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
}

const { persistor, store } = ConfigureStore()

class App extends React.Component {
  componentDidMount () {
    Platform.OS === 'ios'
      ? store.dispatch(initializeStore(this.props.FCMToken))
      : Promise.resolve(NativeModules.FCM.getToken())
        .then(
          FCMToken => { store.dispatch(initializeStore(FCMToken)) }
        )
  }

  // TODO: Add a loading component.
  // render () {
  //   return (
  //     <Provider store = { store }>
  //       <PersistGate loading = { <Loading /> } persistor = { persistor }>
  //         <Main />
  //       </PersistGate>
  //     </Provider>
  //   )
  // }
  render () {
    return (
      <Provider store = { store }>
        <PersistGate loading = { null } persistor = { persistor }>
          <Main />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
