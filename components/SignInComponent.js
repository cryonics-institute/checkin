import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { signinUser, registerUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signinUser: (creds) => dispatch(signinUser(creds)),
    registerUser: (creds) => dispatch(registerUser(creds))
  }
)

class SignIn extends React.Component {
  constructor (props) {
    super(props)

    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()

    this.state = {
      isRegistered: true,
      username: '',
      password: '',
      isUsernameValid: true,
      isPasswordValid: true,
      usernameError: '',
      passwordError: ''
    }

    this.handleSignin = this.handleSignin.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.toggleButtonDisabled = this.toggleButtonDisabled.bind(this)
    this.toggleRegistration = this.toggleRegistration.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
  }

  handleSignin () {
    this.props.signinUser(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  handleRegistration () {
    this.props.registerUser(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  toggleButtonDisabled () {
    if (this.state.isUsernameValid && this.state.isPasswordValid) {
      return false
    } else {
      return true
    }
  }

  toggleRegistration () {
    this.setState({ isRegistered: !this.state.isRegistered })
  }

  validateEmail (value) {
    if (!value) {
      this.setState({ usernameError: 'Required' })
      this.setState({ isUsernameValid: false })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      this.setState({ usernameError: 'Invalid E-Mail Address' })
      this.setState({ isUsernameValid: false })
    } else {
      this.setState({ isUsernameValid: true })
    }

    this.setState({ username: value })
  }

  validatePassword (value) {
    if (!value) {
      this.setState({ passwordError: 'Required' })
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.{8,}).*$/i.test(value)) {
      this.setState(
        { passwordError: 'Password must contain at least eight characters.' }
      )
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.*[A-Z]).*$/i.test(value)) {
      this.setState(
        {
          passwordError: 'Password must contain at least one uppercase letter.'
        }
      )
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.*\d).*$/i.test(value)) {
      this.setState(
        { passwordError: 'Password must contain at least one numeral.' }
      )
      this.setState({ isPasswordValid: false })
    } else {
      this.setState({ isPasswordValid: true })
    }

    this.setState({ password: value })
  }

  render () {
    return (
      this.state.isRegistered
        ? <View style = { styles.container }>
          <Input
            ref = { this.usernameRef }
            placeholder = "E-Mail Address"
            onChangeText = { (username) => this.validateEmail(username) }
            value = { this.state.username }
          />
          <Text style = { styles.errorText }>
            { this.state.isUsernameValid ? '' : this.state.usernameError }
          </Text>
          <Input
            ref = { this.passwordRef }
            placeholder = "Password"
            onChangeText = { (password) => this.validatePassword(password) }
            value = { this.state.password }
          />
          <Text style={ styles.errorText }>
            { this.state.isPasswordValid ? '' : this.state.passwordError }
          </Text>
          <Button
            title = "Sign In"
            disabled = { this.toggleButtonDisabled() }
            onPress = { () => this.handleSignin() }
          />
          <Button
            title = "Create Account"
            onPress = { () => this.toggleRegistration() }
            type="clear"
          />
        </View>
        : <View style = { styles.container }>
          <Input
            placeholder = "Username"
            onChangeText = { (username) => this.setState({ username }) }
            value = { this.state.username }
          />
          <Text style={ styles.errorText }>
            { this.state.isUsernameValid ? '' : this.state.usernameError }
          </Text>
          <Input
            placeholder = "Password"
            onChangeText = { (password) => this.setState({ password }) }
            value = { this.state.password }
          />
          <Text style={ styles.errorText }>
            { this.state.isPasswordValid ? '' : this.state.passwordError }
          </Text>
          <Button
            title = "Create Account"
            disabled = { this.toggleButtonDisabled() }
            onPress = { () => this.handleRegistration() }
          />
          <Button
            title = "Sign In"
            onPress = { () => this.toggleRegistration() }
            type="clear"
          />
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
    },
    errorText: {
      color: 'red'
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
