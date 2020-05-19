import React from 'react'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import BuddyScreen from './BuddyComponent'
import BuddySelectionScreen from './BuddySelectionComponent'

const mapStateToProps = state => {
  return {
    buddyIsSignedIn: state.buddy.isSignedIn
  }
}

// TODO: Goes back to home screen after adding listener.
// TODO: Needs something in Redux that knows which screen it's on.
class Tabs extends React.Component {
  render () {
    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        initialRouteName = { this.props.buddyIsSignedIn ? 'Buddy' : 'Home' }
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
            name = 'BuddySelection'
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
