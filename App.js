import React from 'react'
import BackgroundTask from 'react-native-background-task'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import Main from './components/MainComponent'

// const intervalTimer = () => {
//   return new Promise(
//     (resolve) => {
//       resolve(
//         () => {
//           for (var i = 0; i < 5; i++) {
//             setTimeout(
//               () => {
//                 console.log('Hello from a background task')
//                 // BackgroundTask.finish()
//               },
//               5000
//             )
//           }
//         }
//       )
//     }
//   )
// }

BackgroundTask.define(
  // async () => {
  //   await intervalTimer().catch(
  //     error => {
  //       var errorMessage = new Error(error.message)
  //       throw errorMessage
  //     }
  //   )
  // }
  () => {
    console.log('HELLO FROM A BACKGROUND TASK')
    BackgroundTask.finish()
  }
)

const store = ConfigureStore()

class App extends React.Component {
  componentDidMount () {
    BackgroundTask.schedule()
  }

  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
