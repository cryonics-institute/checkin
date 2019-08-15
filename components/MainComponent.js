import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator }
  from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from '../services/NavigationService'
import AuthLoading from './AuthLoadingComponent'
import PatientSignIn from './PatientSignInComponent'
import PatientHome from './PatientHomeComponent'
import StandbySignIn from './StandbySignInComponent'
import StandbyHome from './StandbyHomeComponent'
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

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      PatientApp: PatientHomeScreen,
      StandbyApp: StandbyHomeScreen,
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
