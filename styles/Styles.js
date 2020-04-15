/**
 * React Native StyleSheet for the project, Cryonics Check-In.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Cryonics Check-In.
 *
 * Cryonics Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Cryonics Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Cryonics Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Dimensions, StyleSheet } from 'react-native'

export const colors = {
  dark: 'steelblue',
  light: 'aliceblue',
  medium: 'lightsteelblue',
  error: 'firebrick',
  transparent: 'transparent'
}

export const styles = StyleSheet.create(
  {
    button: {
      backgroundColor: colors.dark,
      margin: 5
    },
    buttonTitleColorDark: {
      color: colors.dark
    },
    buttonTitleColorLight: {
      color: colors.light
    },
    containerCentered: {
      alignItems: 'center',
      backgroundColor: colors.light,
      flex: 1,
      justifyContent: 'center'
    },
    containerSpaced: {
      alignItems: 'center',
      backgroundColor: colors.light,
      flex: 1,
      justifyContent: 'space-evenly'
    },
    header: {
      backgroundColor: colors.dark,
      color: colors.light
    },
    image: {
      height: Dimensions.get('window').width * 0.8,
      margin: 5,
      width: Dimensions.get('window').width * 0.8
    },
    paragraph: {
      margin: 5,
      textAlign: 'center'
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '90%'
    },
    slider: {
      margin: 5,
      width: '75%'
    },
    text: {
      margin: 5
    },
    textError: {
      color: colors.error,
      fontSize: 12,
      margin: 5
    },
    textStrikeThrough: {
      color: colors.medium,
      textDecorationLine: 'line-through'
    },
    timeRow: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5,
      width: '80%'
    },
    title: {
      margin: 5
    },
    tooltip: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5
    },
    topTab: {
      backgroundColor: colors.medium
    },
    transparent: {
      color: colors.transparent,
      fontSize: 12
    }
  }
)
