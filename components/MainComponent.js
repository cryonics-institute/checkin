import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator }
  from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from '../services/NavigationService'
import AuthLoading from './AuthLoadingComponent'
import Home from './HomeComponent'
import SignIn from './SignInComponent'

// Setup Redux
const mapStateToProps = state => {
  return { }
}

// Setup Navigation Components
class AuthLoadingScreen extends React.Component {
  render () {
    return (
      <AuthLoading navigation={this.props.navigation}/>
    )
  }
}

class HomeScreen extends React.Component {
  render () {
    return (
      <Home navigation={this.props.navigation}/>
    )
  }
}

class SignInScreen extends React.Component {
  render () {
    return (
      <SignIn navigation={this.props.navigation}/>
    )
  }
}

const AppStack = createStackNavigator({ Home: HomeScreen })

const AuthStack = createStackNavigator({ SignIn: SignInScreen })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
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
        ref={
          navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        }
      />
    )
  }
}

export default connect(mapStateToProps)(Main)
