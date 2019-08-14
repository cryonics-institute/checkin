import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

class SignIn extends React.Component {
  componentDidMount () {
    this.props.auth.isPatient
      ? this.props.navigation.navigate('PatientSignIn')
      : this.props.navigation.navigate('StandbySignIn')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style = { styles.container }>
        <Text h3 style = { styles.title }>Sign-In</Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default connect(mapStateToProps)(SignIn)
