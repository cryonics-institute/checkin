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
