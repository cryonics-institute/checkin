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
      isRegistered: true,
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

  handleRegistration () {
    console.log('TRIGGERED REGISTRATION HANDLER')
    // TODO: Initiate registration action.
  }

  toggleRegistration () {
    this.setState({ isRegistered: !this.state.isRegistered })
  }

  render () {
    return (
      this.state.isRegistered
        ? <View style={styles.container}>
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
          <Button
            onPress = { () => this.toggleRegistration() }
            title = "Create Account"
          />
        </View>
        : <View style={styles.container}>
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
            onPress = { () => this.handleRegistration() }
            title = "Create Account"
          />
          <Button
            onPress = { () => this.toggleRegistration() }
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
