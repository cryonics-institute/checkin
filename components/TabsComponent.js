import React from 'react'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import BuddyScreen from './BuddyComponent'
import BuddySelectionScreen from './BuddySelectionComponent'

// TODO: buddyIsAdded needs useEffect Hook.
// TODO: Goes back to home screen after adding listener.
// TODO: Needs something in Redux that knows which screen it's on.
function Tabs () {
  const Tab = createBottomTabNavigator()
  const buddyIsAdded = useSelector(state => state.buddy.isAdded)

  return (
    <Tab.Navigator
      initialRouteName = { buddyIsAdded ? 'Buddy' : 'Home' }
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
      { buddyIsAdded
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

export default Tabs
