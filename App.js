import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { Button } from 'react-native-elements'
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
// import withFirebaseAuth from 'react-with-firebase-auth'
// import firebaseConfig from './firebase/config'

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const firebaseAppAuth = firebaseApp.auth()
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider()
// }

// GitHub Test

class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
// export default withFirebaseAuth({ providers, firebaseAppAuth })(App)
