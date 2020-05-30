// TODO: Replace sign-out button in right of header with a drawer component.
// TODO: Support safe areas for iPhoneX
// https://reactnavigation.org/docs/handling-safe-area
// @flow
import React from 'react'
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
    if (this.props.username !== null && this.props.password !== null) {
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
