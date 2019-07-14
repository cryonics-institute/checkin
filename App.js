import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebaseConfig from './firebase/config'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

class App extends Component {
  render () {
    const {
      user,
      signOut,
      signInWithGoogle
    } = this.props

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {
          user
            ? <Text>Hello, {user.displayName}</Text>
            : <Text>Please sign in.</Text>
        }
        {
          user
            ? <Button onPress={signOut} title="Sign out"/>
            : <Button onPress={signInWithGoogle} title="Sign in with Google"/>
        }
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

export default withFirebaseAuth({ providers, firebaseAppAuth })(App)
