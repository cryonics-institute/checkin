import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

const RenderTabs = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName = 'Home'
      backBehavior = 'history'
      tabBarOptions = {
        {
          activeBackgroundColor: colors.dark,
          activeTintColor: colors.light,
          keyboardHidesTabBar: true,
          style: styles.tab
        }
      }
    >
      <Tab.Screen
        name = 'Home'
        component = { HomeScreen }
        options = {
          {
            tabBarLabel: 'Check In',
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color, size }) => <Icon
              name = 'check'
              type = 'material'
              color = { color }
              size = { size }
            />
          }
        }
      />
      <Tab.Screen
        name = 'Patient'
        component = { PatientSelectionScreen }
        options = {
          {
            tabBarLabel: 'Buddies',
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color, size }) => <Icon
              name = 'people'
              type = 'material'
              color = { color }
              size = { size }
            />
          }
        }
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
              name = 'Tabs'
              component = { RenderTabs }
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
