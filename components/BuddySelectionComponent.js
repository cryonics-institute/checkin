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
import { HeaderHeightContext } from '@react-navigation/stack'
import { addBuddy } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

type Props = {
  addBuddy: func,
  email: string,
  emailError: string,
  handlePress: func,
  isEmailValid: boolean,
  navigation: { navigate: func },
  validateEmail: func
}

type State = {
  email: string,
  isEmailValid: boolean,
  emailError: string
}

const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => (
  {
    addBuddy: (email) => dispatch(addBuddy(email))
  }
)

function BuddySelectionView (props: Props) {
  const windowHeight: number = useWindowDimensions().height

  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
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
                onChangeText = { email => props.validateEmail(email) }
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
    </HeaderHeightContext.Consumer>
  )
}

class BuddySelection extends React.Component<Props, State> {
  constructor (props) {
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
          error => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch(error => console.log(error.message))
    }
  }

  handlePress (event: SyntheticEvent<HTMLButtonElement>): void {
    this.props.addBuddy(this.state.email.toLowerCase())
      .then(
        () => this.props.navigation.navigate('Buddy')
      )
      .catch(error => console.log(error.message))
  }

  validateEmail (
    event: SyntheticInputEvent<HTMLInputElement>,
    email: string
  ): void {
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
        handlePress = { () => this.handlePress() }
        validateEmail = { username => this.validateEmail(username) }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddySelection)
