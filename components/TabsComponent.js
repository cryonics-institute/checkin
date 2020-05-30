// @flow
import React from 'react'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import BuddyScreen from './BuddyComponent'
import BuddySelectionScreen from './BuddySelectionComponent'

type Props = {
  buddyIsAdded: boolean
}

const mapStateToProps = state => {
  return {
    buddyIsAdded: state.buddy.isAdded
  }
}

class Tabs extends React.Component<Props> {
  render () {
    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
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
        { this.props.buddyIsAdded
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
