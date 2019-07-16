import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    // checkins: state.checkins,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    // onGetCheckins: () => dispatch(getCheckins()),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
  }
)

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount () {
    // this.props.onGetCheckins()
  }

  componentWillUnmount () {
    this.props.logoutUser()
  }

  handleLogin (event) {
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
    event.preventDefault()
  }

  render () {
    return (
      <View style={styles.container}>
        <Input
          placeholder = "Username"
          onChangeText = { (username) => this.setState({ username }) }
          value = { this.state.username }
        />
        <Input
          placeholder = "Password"
          onChangeText = { (password) => this.setState({ password }) }
          value = { this.state.password }
        />
        <Button
          onPress = { this.handleLogin }
          title = "Login"
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)
