import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator }
  from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from '../services/NavigationService'
import AuthLoading from './AuthLoadingComponent'
import Home from './HomeComponent'
import PatientSignIn from './PatientSignInComponent'
import PatientHome from './PatientHomeComponent'
import SignIn from './SignInComponent'
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

class HomeScreen extends React.Component {
  render () {
    return (
      <Home navigation = {this.props.navigation}/>
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

class SignInScreen extends React.Component {
  render () {
    return (
      <SignIn navigation = {this.props.navigation}/>
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

const AppStack = createStackNavigator({ Home: HomeScreen })

const AuthStack = createStackNavigator({ SignIn: SignInScreen })

const PatientHomeStack =
  createStackNavigator({ PatientHome: PatientHomeScreen })

const PatientSignInStack =
  createStackNavigator({ PatientSignIn: PatientSignInScreen })

const WelcomeStack = createStackNavigator({ Welcome: WelcomeScreen })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      PatientHome: PatientHomeStack,
      PatientSignIn: PatientSignInStack,
      Welcome: WelcomeStack
    },
    {
      initialRouteName: 'Welcome'
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
