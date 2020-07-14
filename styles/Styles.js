/**
 * React Native StyleSheet for the project, Check-In.
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

import { StyleSheet } from 'react-native'

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
    buttonTopRight: {
      alignSelf: 'flex-end',
      paddingRight: 5,
      paddingTop: 5,
      position: 'absolute'
    },
    containerCentered: {
      alignItems: 'center',
      backgroundColor: colors.light,
      flex: 1,
      justifyContent: 'center'
    },
    containerRounded: {
      alignSelf: 'center',
      backgroundColor: colors.medium,
      borderColor: colors.dark,
      borderRadius: 10,
      borderWidth: 2,
      margin: '5%',
      padding: '5%'
    },
    containerScrolling: {
      backgroundColor: colors.light,
      flex: 1
    },
    containerScrollingContent: {
      alignItems: 'center',
      flexGrow: 1,
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
    tab: {
      backgroundColor: colors.medium
    },
    text: {
      margin: 5
    },
    textBold: {
      fontWeight: 'bold'
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
    textTip: {
      color: colors.dark,
      fontSize: 18
    },
    textTransparent: {
      color: colors.transparent,
      fontSize: 12,
      margin: 5
    },
    title: {
      margin: 5
    },
    tooltip: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5
    }
  }
)
