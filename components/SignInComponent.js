import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { loginUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    loginUser: (creds) => dispatch(loginUser(creds))
  }
)

class SignIn extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin () {
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
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
          onPress = { () => this.handleLogin() }
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
