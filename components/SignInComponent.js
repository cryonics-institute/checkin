// TODO: Handle rejected sign-ins!

/**
 * Sign-in component for the project, Check-In, that presents the view with
 * which the user signs in or registers.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as React from 'react'
import { KeyboardAvoidingView, Platform, View, useWindowDimensions }
  from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderHeightContext } from '@react-navigation/stack'
import { signIn, register } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

type ComponentProps = {
  isPasswordValid: boolean,
  isUsernameValid: boolean,
  password: string,
  passwordError: string,
  username: string,
  usernameError: string,
  register: ({ username: string, password: string }) => void,
  signIn: ({ username: string, password: string }) => void,
  toggleButtonDisabled: () => boolean,
  toggleRegistration: () => void,
  handleRegistration: () => void,
  handleSignin: () => void,
  validateEmail: (email: string) => void,
  validatePassword: (password: string) => void
}

type ComponentState = {
  isRegistered: boolean,
  username: string,
  password: string,
  isUsernameValid: boolean,
  isPasswordValid: boolean,
  usernameError: string,
  passwordError: string
}

type SignInViewProps = {
  isPasswordValid: boolean,
  isUsernameValid: boolean,
  password: string,
  passwordError: string,
  username: string,
  usernameError: string,
  toggleButtonDisabled: () => boolean,
  toggleRegistration: () => void,
  handleSignin: () => void,
  validateEmail: (email: string) => void,
  validatePassword: (password: string) => void
}

type RegistrationViewProps = {
  isPasswordValid: boolean,
  isUsernameValid: boolean,
  password: string,
  passwordError: string,
  username: string,
  usernameError: string,
  toggleButtonDisabled: () => boolean,
  toggleRegistration: () => void,
  handleRegistration: () => void,
  validateEmail: (email: string) => void,
  validatePassword: (password: string) => void
}

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

function SignInView (props: SignInViewProps) {
  const windowHeight: number = useWindowDimensions().height

  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View
            style = {
              {
                backgroundColor: colors.light,
                height: windowHeight - headerHeight
              }
            }
          >
            <KeyboardAvoidingView
              behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
              style = { styles.containerCentered }
            >
              <Input
                placeholder = 'E-Mail Address'
                onChangeText = {
                  (username: string) => props.validateEmail(username)
                }
                value = { props.username }
              />
              <Text style = { styles.textError }>
                { props.isUsernameValid ? '' : props.usernameError }
              </Text>
              <Input
                placeholder = 'Password'
                onChangeText = {
                  (password: string) => props.validatePassword(password)
                }
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
            </KeyboardAvoidingView>
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  )
}

function RegistrationView (props: RegistrationViewProps) {
  const windowHeight: number = useWindowDimensions().height

  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View
            style = {
              {
                backgroundColor: colors.light,
                height: windowHeight - headerHeight
              }
            }
          >
            <KeyboardAvoidingView
              behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
              style = { styles.containerCentered }
            >
              <Input
                placeholder = 'E-Mail Address'
                onChangeText = {
                  (username: string) => props.validateEmail(username)
                }
                value = { props.username }
              />
              <Text style={ styles.textError }>
                { props.isUsernameValid ? '' : props.usernameError }
              </Text>
              <Input
                placeholder = 'Password'
                onChangeText = {
                  (password: string) => props.validatePassword(password)
                }
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
            </KeyboardAvoidingView>
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  )
}

class SignIn extends React.Component<ComponentProps, ComponentState> {
  constructor (props) {
    super(props)

    this.state = {
      isRegistered: true,
      isUsernameValid: false,
      isPasswordValid: false,
      username: '',
      usernameError: '',
      password: '',
      passwordError: ''
    }
  }

  handleSignin (): void {
    this.props.signIn(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  handleRegistration (): void {
    this.props.register(
      {
        username: this.state.username,
        password: this.state.password
      }
    )
  }

  toggleButtonDisabled (): boolean {
    if (this.state.isUsernameValid && this.state.isPasswordValid) {
      return false
    } else {
      return true
    }
  }

  toggleRegistration (): void {
    this.setState({ isRegistered: !this.state.isRegistered })
  }

  validateEmail (email: string): void {
    if (!email) {
      this.setState({ usernameError: 'Required' })
      this.setState({ isUsernameValid: false })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ usernameError: 'Invalid E-Mail Address' })
      this.setState({ isUsernameValid: false })
    } else {
      this.setState({ isUsernameValid: true })
    }

    this.setState({ username: email })
  }

  validatePassword (password: string): void {
    if (!password) {
      this.setState({ passwordError: 'Required' })
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.{8,}).*$/i.test(password)) {
      this.setState(
        { passwordError: 'Password must contain at least eight characters.' }
      )
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.*[A-Z]).*$/i.test(password)) {
      this.setState(
        {
          passwordError: 'Password must contain at least one uppercase letter.'
        }
      )
      this.setState({ isPasswordValid: false })
    } else if (!/^.*(?=.*\d).*$/i.test(password)) {
      this.setState(
        { passwordError: 'Password must contain at least one numeral.' }
      )
      this.setState({ isPasswordValid: false })
    } else {
      this.setState({ isPasswordValid: true })
    }

    this.setState({ password: password })
  }

  render () {
    return (
      this.state.isRegistered
        ? <SignInView
          username = { this.state.username }
          password = { this.state.password }
          isUsernameValid = { this.state.isUsernameValid }
          usernameError = { this.state.usernameError }
          isPasswordValid = { this.state.isPasswordValid }
          passwordError = { this.state.passwordError }
          handleSignin = { this.handleSignin.bind(this) }
          toggleButtonDisabled = { this.toggleButtonDisabled.bind(this) }
          toggleRegistration = { this.toggleRegistration.bind(this) }
          validateEmail = { this.validateEmail.bind(this) }
          validatePassword = { this.validatePassword.bind(this) }
        />
        : <RegistrationView
          username = { this.state.username }
          password = { this.state.password }
          isUsernameValid = { this.state.isUsernameValid }
          usernameError = { this.state.usernameError }
          isPasswordValid = { this.state.isPasswordValid }
          passwordError = { this.state.passwordError }
          handleRegistration = { this.handleRegistration.bind(this) }
          toggleButtonDisabled = { this.toggleButtonDisabled.bind(this) }
          toggleRegistration = { this.toggleRegistration.bind(this) }
          validateEmail = { this.validateEmail.bind(this) }
          validatePassword = { this.validatePassword.bind(this) }
        />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
