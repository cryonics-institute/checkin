/**
 * Tabs component for the project, Check-In, that defines the presentation of
 * tabs.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as React from 'react'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { colors, styles } from '../styles/Styles'
import HomeScreen from './HomeComponent'
import BuddyScreen from './BuddyComponent'
import BuddySelectionScreen from './BuddySelectionComponent'

type ViewProps = {
  color?: string,
  size?: number
}

const BuddyStack = createStackNavigator()
const Tab = createBottomTabNavigator()

function BuddyStackScreen () {
  const buddyIsAdded: boolean = useSelector(state => state.buddy.isAdded)

  return (
    <BuddyStack.Navigator
      initialRouteName = { buddyIsAdded ? 'Buddy' : 'BuddySelection' }
    >
      <BuddyStack.Screen
        name = 'Buddy'
        component = { BuddyScreen }
      />
      <BuddyStack.Screen
        name = 'BuddySelection'
        component = { BuddySelectionScreen }
      />
    </BuddyStack.Navigator>
  )
}

function Tabs (props: ViewProps) {
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
      <Tab.Screen
        name = 'BuddyStack'
        component = { BuddyStackScreen }
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

export default Tabs
