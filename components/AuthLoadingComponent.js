import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

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

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      padding: 20
    }
  }
)

export default connect(mapStateToProps)(AuthLoading)
