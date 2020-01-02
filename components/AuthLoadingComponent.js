import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

class AuthLoading extends React.Component {
  componentDidMount () {
    this.props.auth.user === null
      ? this.props.navigation.navigate('Auth')
      : this.props.auth.isPatient
        ? this.props.navigation.navigate('PatientAuth')
        : this.props.navigation.navigate('StandbyAuth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style = { styles.containerCentered }>
        <Text>Cryonics Check-In</Text>
        <ActivityIndicator />
      </View>
    )
  }
}

export default connect(mapStateToProps)(AuthLoading)
