import React from 'react'
import { createMaterialTopTabNavigator }
  from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { signIn } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import SignInScreen from './SignInComponent'
import SignOutScreen from './SignOutComponent'
import PatientSelectionScreen from './PatientSelectionComponent'

const mapStateToProps = state => {
  return {
    isSignedIn: state.patient.isSignedIn,
    password: state.token.password,
    username: state.token.username
  }
}

const mapDispatchToProps = dispatch => (
  { signIn: (creds, isAutomatic) => dispatch(signIn(creds, isAutomatic)) }
)

const RenderTopTabs = () => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName = 'Times'
      tabBarOptions = { { style: styles.topTab } }
    >
      <Tab.Screen
        name = 'Times'
        component = { HomeScreen }
      />
      <Tab.Screen
        name = 'Buddies'
        component = { PatientSelectionScreen }
      />
    </Tab.Navigator>
  )
}

// Setup Main Component
class Main extends React.Component {
  componentDidMount () {
    if (
      this.props.username !== null && this.props.password !== null
    ) {
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
          { this.props.isSignedIn
            ? <Stack.Screen
              name = 'TopTabs'
              component = { RenderTopTabs }
              options = {
                {
                  // eslint-disable-next-line react/display-name
                  headerRight: () => <SignOutScreen/>
                }
              }
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
