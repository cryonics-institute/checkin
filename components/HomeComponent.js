import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    logoutUser: () => dispatch(logoutUser())
  }
)

class Home extends React.Component {
  handleLogout () {
    this.props.logoutUser()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          onPress = { () => this.handleLogout() }
          title = "Logout"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
