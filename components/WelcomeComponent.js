// TODO: Needs work because the logo doesn't display fast enough and the
// activity indicator is too small.

/**
 * Welcome component for the project, Check-In; a splash-screen.
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
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { BLUE_LOGO } from '../assets'
import { styles } from '../styles/Styles'

function Welcome () {
  const height: number = useWindowDimensions().height
  const width: number = useWindowDimensions().width

  const smallestDimension = (height: number, width: number): number => {
    if (height < width) {
      return height
    } else {
      return width
    }
  }

  return (
    <View style = { styles.containerSpaced }>
      <Image
        source = { BLUE_LOGO }
        style = {
          {
            height: smallestDimension(height, width) * 0.8,
            width: smallestDimension(height, width) * 0.8
          }
        }
      />
      <ActivityIndicator />
    </View>
  )
}

export default Welcome
