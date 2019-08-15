import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator }
  from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from '../services/NavigationService'
import AuthLoading from './AuthLoadingComponent'
import PatientHome from './PatientHomeComponent'
import PatientSignIn from './PatientSignInComponent'
import StandbyHome from './StandbyHomeComponent'
import StandbyPatientSelection from './StandbyPatientSelectionComponent'
import StandbySignIn from './StandbySignInComponent'
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
    PatientAuth: PatientSignInScreen,
    StandbyAuth: StandbySignInScreen,
    Welcome: WelcomeScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

const StandbyAppStack = createStackNavigator(
  {
    StandbyHome: StandbyHomeScreen,
    StandbyPatientSelection: StandbyPatientSelectionScreen
  },
  {
    initialRouteName: 'StandbyPatientSelection'
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      PatientApp: PatientHomeScreen,
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
