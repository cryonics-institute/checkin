import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { addUser, logoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    logoutUser: () => dispatch(logoutUser()),
    addUser: () => dispatch(addUser())
  }
)

class Home extends React.Component {
  handleCheckin () {
    this.props.addUser()
  }

  handleLogout () {
    this.props.logoutUser()
  }

  render () {
    return (
      <View style = { styles.container }>
        <Text>Home Screen</Text>
        <Button
          onPress = { () => this.handleCheckin() }
          title = "Check-In"
        />
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
