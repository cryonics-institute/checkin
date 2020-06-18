// TODO: Replace sign-out button in right of header with a drawer component.
// TODO: Support safe areas for iPhoneX
// https://reactnavigation.org/docs/handling-safe-area

/**
 * Main component for the project, Check-In, that defines the app's navigation.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { signIn } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'
import SignInScreen from './SignInComponent'
// import SignOutScreen from './SignOutComponent'
import Tabs from './TabsComponent'

type Props = {
  password: string,
  signIn: func,
  userIsSignedIn: boolean,
  username: string
}

const mapStateToProps = state => {
  return {
    password: state.token.password,
    userIsSignedIn: state.user.isSignedIn,
    username: state.token.username
  }
}

const mapDispatchToProps = dispatch => (
  { signIn: (creds, isAutomatic) => dispatch(signIn(creds, isAutomatic)) }
)

// Setup Main Component
class Main extends React.Component<Props> {
  componentDidMount () {
    if (this.props.username !== '' && this.props.password !== '') {
      this.props.signIn(
        { username: this.props.username, password: this.props.password },
        true
      )
        .catch(error => console.log(error.message))
    }
  }

  render () {
    const Stack = createStackNavigator()

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions = {
            {
              headerStyle: styles.header,
              headerTintColor: colors.light,
              title: 'Check-In'
            }
          }
        >
          { this.props.userIsSignedIn
            ? <Stack.Screen
              name = 'Tabs'
              component = { Tabs }
            />
            : <Stack.Screen
              name = 'SignIn'
              component = { SignInScreen }
              options = { { title: 'Sign-In' } }
            />
          }
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
