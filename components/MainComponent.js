import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { connect } from 'react-redux'
import NavigationService from '../services/NavigationService'
import { colors, styles } from '../styles/Styles'
import AuthLoading from './AuthLoadingComponent'
import PatientHome from './PatientHomeComponent'
import PatientSignIn from './PatientSignInComponent'
import PatientSignOut from './PatientSignOutComponent'
import StandbyHome from './StandbyHomeComponent'
import StandbyPatientSelection from './StandbyPatientSelectionComponent'
import StandbySignIn from './StandbySignInComponent'
import StandbySignOut from './StandbySignOutComponent'
import Welcome from './WelcomeComponent'

// Setup Redux
const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

// Setup Navigation Components
class AuthLoadingScreen extends React.Component {
  render () {
    return (
      <AuthLoading navigation = {this.props.navigation}/>
    )
  }
}

class PatientHomeScreen extends React.Component {
  render () {
    return (
      <PatientHome navigation = {this.props.navigation}/>
    )
  }
}

class PatientSignInScreen extends React.Component {
  render () {
    return (
      <PatientSignIn navigation = {this.props.navigation}/>
    )
  }
}

class StandbyHomeScreen extends React.Component {
  render () {
    return (
      <StandbyHome navigation = {this.props.navigation}/>
    )
  }
}

class StandbyPatientSelectionScreen extends React.Component {
  render () {
    return (
      <StandbyPatientSelection navigation = {this.props.navigation}/>
    )
  }
}

class StandbySignInScreen extends React.Component {
  render () {
    return (
      <StandbySignIn navigation = {this.props.navigation}/>
    )
  }
}

class WelcomeScreen extends React.Component {
  render () {
    return (
      <Welcome navigation = {this.props.navigation}/>
    )
  }
}

const AuthStack = createStackNavigator(
  {
    PatientAuth: {
      screen: PatientSignInScreen,
      navigationOptions: () => (
        {
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    },
    StandbyAuth: {
      screen: StandbySignInScreen,
      navigationOptions: () => (
        {
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: () => (
        {
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    }
  },
  {
    initialRouteName: 'Welcome'
  }
)

const PatientAppStack = createStackNavigator(
  {
    PatientHome: {
      screen: PatientHomeScreen,
      navigationOptions: () => (
        {
          headerRight: <PatientSignOut/>,
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    }
  }
)

const StandbyAppStack = createStackNavigator(
  {
    StandbyHome: {
      screen: StandbyHomeScreen,
      navigationOptions: () => (
        {
          headerRight: <StandbySignOut/>,
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    },
    StandbyPatientSelection: {
      screen: StandbyPatientSelectionScreen,
      navigationOptions: () => (
        {
          headerRight: <StandbySignOut/>,
          headerStyle: styles.header,
          headerTintColor: colors.light
        }
      )
    }
  },
  {
    initialRouteName: 'StandbyPatientSelection'
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoadingScreen,
        navigationOptions: () => (
          {
            headerStyle: styles.header,
            headerTintColor: colors.light
          }
        )
      },
      PatientApp: PatientAppStack,
      StandbyApp: StandbyAppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

// Setup Main Component
class Main extends React.Component {
  render () {
    return (
      <AppContainer
        ref = {
          navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        }
      />
    )
  }
}

export default connect(mapStateToProps)(Main)
