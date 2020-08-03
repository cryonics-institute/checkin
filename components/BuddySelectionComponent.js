// TODO: Move loading buddy from memory up the stack to at least the main view
// if not App.js.

/**
 * Buddy-selection-tab component for the project, Check-In, that presents the
 * view with which the user adds buddies.
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
import { useHeaderHeight } from '@react-navigation/stack'
import { addBuddy } from '../redux/ActionThunks'
import { colors, styles } from '../styles/Styles'

type ComponentProps = {
  email: string,
  navigation: { navigate: (string: string) => void },
  addBuddy: (email: string) => void
}

type ComponentState = {
  email: string,
  isEmailValid: boolean,
  emailError: string
}

type ViewProps = {
  email: string,
  emailError: string,
  isEmailValid: boolean,
  handlePress: () => void,
  validateEmail: (email: string) => void
}

const mapStateToProps = state => {
  return {
    email: state.buddy.email
  }
}

const mapDispatchToProps = dispatch => (
  { addBuddy: (email: string) => dispatch(addBuddy(email)) }
)

function BuddySelectionView (props: ViewProps) {
  const windowHeight: number = useWindowDimensions().height
  const headerHeight: number = useHeaderHeight()

  return (
    <View
      style = {
        {
          backgroundColor: colors.light,
          height: windowHeight - (headerHeight * 2)
        }
      }
    >
      <KeyboardAvoidingView
        behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
        style = { styles.containerCentered }
      >
        <Input
          placeholder = 'Buddy&#39;s E-Mail Address'
          onChangeText = { (email: string) => props.validateEmail(email) }
          value = { props.email }
        />
        <Text style = { styles.textError }>
          { props.isEmailValid ? '' : props.emailError }
        </Text>
        <Button
          buttonStyle = { styles.button }
          disabled = { !props.isEmailValid }
          onPress = { () => props.handlePress() }
          title = 'Submit'
        />
      </KeyboardAvoidingView>
    </View>
  )
}

class BuddySelection extends React.Component<ComponentProps, ComponentState> {
  constructor (props: ComponentProps) {
    super(props)

    this.state = {
      email: '',
      isEmailValid: false,
      emailError: ''
    }
  }

  componentDidMount () {
    if (this.props.email !== null) {
      Promise.resolve(this.setState({ email: this.props.email }))
        .then(
          () => this.props.addBuddy(this.state.email.toLowerCase()),
          (error: Error) => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch((error: Error) => console.log(error.message))
    }
  }

  handlePress (): void {
    Promise.resolve(this.props.addBuddy(this.state.email.toLowerCase()))
      .then(
        () => this.props.navigation.navigate('Buddy'),
        (error: Error) => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch((error: Error) => console.log(error.message))
  }

  validateEmail (email: string): void {
    if (!email) {
      this.setState({ emailError: 'Required' })
      this.setState({ isEmailValid: false })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ emailError: 'Invalid E-Mail Address' })
      this.setState({ isEmailValid: false })
    } else {
      this.setState({ isEmailValid: true })
    }

    this.setState({ email: email })
  }

  render () {
    return (
      <BuddySelectionView
        email = { this.state.email }
        isEmailValid = { this.state.isEmailValid }
        emailError = { this.state.emailError }
        handlePress = { this.handlePress.bind(this) }
        validateEmail = { this.validateEmail.bind(this) }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddySelection)
