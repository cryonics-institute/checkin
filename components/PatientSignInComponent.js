import React from 'react'
import { View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { signinPatient, registerPatient } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signinPatient: (creds) => dispatch(signinPatient(creds)),
    registerPatient: (creds) => dispatch(registerPatient(creds))
  }
)

class PatientSignIn extends React.Component {
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
    this.props.signinPatient(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  handleRegistration () {
    this.props.registerPatient(
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
        ? <View style = { styles.containerCentered }>
          <Input
            ref = { this.usernameRef }
            placeholder = 'E-Mail Address'
            onChangeText = { (username) => this.validateEmail(username) }
            value = { this.state.username }
          />
          <Text style = { styles.textError }>
            { this.state.isUsernameValid ? '' : this.state.usernameError }
          </Text>
          <Input
            ref = { this.passwordRef }
            placeholder = 'Password'
            onChangeText = { (password) => this.validatePassword(password) }
            value = { this.state.password }
          />
          <Text style={ styles.textError }>
            { this.state.isPasswordValid ? '' : this.state.passwordError }
          </Text>
          <Button
            title = 'Sign In'
            disabled = { this.toggleButtonDisabled() }
            onPress = { () => this.handleSignin() }
            style = { styles.button }
          />
          <Button
            title = 'Create Account'
            onPress = { () => this.toggleRegistration() }
            type='clear'
            style = { styles.button }
          />
        </View>
        : <View style = { styles.containerCentered }>
          <Input
            placeholder = 'E-Mail'
            onChangeText = { (username) => this.validateEmail(username) }
            value = { this.state.username }
          />
          <Text style={ styles.textError }>
            { this.state.isUsernameValid ? '' : this.state.usernameError }
          </Text>
          <Input
            placeholder = 'Password'
            onChangeText = { (password) => this.validatePassword(password) }
            value = { this.state.password }
          />
          <Text style={ styles.textError }>
            { this.state.isPasswordValid ? '' : this.state.passwordError }
          </Text>
          <Button
            title = 'Create Account'
            disabled = { this.toggleButtonDisabled() }
            onPress = { () => this.handleRegistration() }
            style = { styles.button }
          />
          <Button
            title = 'Sign In'
            onPress = { () => this.toggleRegistration() }
            style = { styles.button }
            type='clear'
          />
        </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSignIn)
