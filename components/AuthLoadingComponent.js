import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

class AuthLoading extends React.Component {
  componentDidMount () {
    this.props.auth.isAuthenticated
      ? this.props.navigation.navigate('App')
      : this.props.navigation.navigate('Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style = { styles.container }>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default connect(mapStateToProps)(AuthLoading)
