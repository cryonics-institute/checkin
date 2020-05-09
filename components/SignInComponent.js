// TODO: Replace Dimensions with useWindowDimensions.
// TODO: Handle rejected sign-ins!
import React from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderHeightContext } from '@react-navigation/stack'
import { signIn, register } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = dispatch => (
  {
    signIn: (creds, isAutomatic) => dispatch(signIn(creds, isAutomatic)),
    register: (creds) => dispatch(register(creds))
  }
)

const RenderSignInView = (props) => {
  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View
            style = {
              {
                backgroundColor: colors.light,
                height: Dimensions.get('window').height - headerHeight,
                width: Dimensions.get('window').width
              }
            }
          >
            <KeyboardAvoidingView
              behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
              style = { styles.containerAvoiding }
            >
              <View
                style = { { height: Dimensions.get('window').height / 4 } }
              >
              </View>
              <View style = { styles.containerContent }>
                <Input
                  placeholder = 'E-Mail Address'
                  onChangeText = { username => props.validateEmail(username) }
                  value = { props.username }
                />
                <Text style = { styles.textError }>
                  { props.isUsernameValid ? '' : props.usernameError }
                </Text>
                <Input
                  placeholder = 'Password'
                  onChangeText = { password => props.validatePassword(password) }
                  value = { props.password }
                />
                <Text style={ styles.textError }>
                  { props.isPasswordValid ? '' : props.passwordError }
                </Text>
                <Button
                  buttonStyle = { styles.button }
                  disabled = { props.toggleButtonDisabled() }
                  onPress = { () => props.handleSignin() }
                  title = 'Sign In'
                />
                <Button
                  onPress = { () => props.toggleRegistration() }
                  title = 'Create Account'
                  titleStyle = { styles.buttonTitleColorDark }
                  type = 'clear'
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  )
}

const RenderRegistrationView = (props) => {
  return (
    <KeyboardAvoidingView
      behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
      style = { styles.containerAvoiding }
    >
      <View style = { styles.containerCentered }>
        <Input
          placeholder = 'E-Mail Address'
          onChangeText = { (username) => props.validateEmail(username) }
          value = { props.username }
        />
        <Text style={ styles.textError }>
          { props.isUsernameValid ? '' : props.usernameError }
        </Text>
        <Input
          placeholder = 'Password'
          onChangeText = { (password) => props.validatePassword(password) }
          value = { props.password }
        />
        <Text style={ styles.textError }>
          { props.isPasswordValid ? '' : props.passwordError }
        </Text>
        <Button
          buttonStyle = { styles.button }
          disabled = { props.toggleButtonDisabled() }
          onPress = { () => props.handleRegistration() }
          title = 'Create Account'
        />
        <Button
          onPress = { () => props.toggleRegistration() }
          title = 'Sign In'
          titleStyle = { styles.buttonTitleColorDark }
          type = 'clear'
        />
      </View>
    </KeyboardAvoidingView>
  )
}

class SignIn extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isRegistered: true,
      username: '',
      password: '',
      isUsernameValid: false,
      isPasswordValid: false,
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
    this.props.signIn(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  handleRegistration () {
    this.props.register(
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
        ? <RenderSignInView
          username = { this.state.username }
          password = { this.state.password }
          isUsernameValid = { this.state.isUsernameValid }
          usernameError = { this.state.usernameError }
          isPasswordValid = { this.state.isPasswordValid }
          passwordError = { this.state.passwordError }
          handleSignin = { () => this.handleSignin() }
          toggleButtonDisabled = { () => this.toggleButtonDisabled() }
          toggleRegistration = { () => this.toggleRegistration() }
          validateEmail = { username => this.validateEmail(username) }
          validatePassword = { password => this.validatePassword(password) }
        />
        : <RenderRegistrationView
          username = { this.state.username }
          password = { this.state.password }
          isUsernameValid = { this.state.isUsernameValid }
          usernameError = { this.state.usernameError }
          isPasswordValid = { this.state.isPasswordValid }
          passwordError = { this.state.passwordError }
          handleSignin = { () => this.handleRegistration() }
          toggleButtonDisabled = { () => this.toggleButtonDisabled() }
          toggleRegistration = { () => this.toggleRegistration() }
          validateEmail = { username => this.validateEmail(username) }
          validatePassword = { password => this.validatePassword(password) }
        />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
