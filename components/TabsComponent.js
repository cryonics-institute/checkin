import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { connect } from 'react-redux'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import BuddyScreen from './BuddyComponent'
import BuddySelectionScreen from './BuddySelectionComponent'

const mapStateToProps = state => {
  return {
    buddyIsSignedIn: state.buddy.isSignedIn
  }
}

// Setup Main Component
class Tabs extends React.Component {
  // componentDidMount () {
  //   if (
  //     this.props.username !== null && this.props.password !== null
  //   ) {
  //     this.props.signIn(
  //       { username: this.props.username, password: this.props.password },
  //       true
  //     )
  //       .catch(error => console.log(error.message))
  //   }
  // }

  render () {
    const Tab = createBottomTabNavigator()

    // TODO: Buddy screen will need a conditional state parameter in redux that switches to standby home when user is added.
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
        { this.props.buddyIsSignedIn
          ? <Tab.Screen
            name = 'Buddy'
            component = { BuddyScreen }
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
          : <Tab.Screen
            name = 'Buddy'
            component = { BuddySelectionScreen }
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
        }
      </Tab.Navigator>
    )
  }
}

export default connect(mapStateToProps)(Tabs)
