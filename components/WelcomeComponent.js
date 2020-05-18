import React from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { BLUE_LOGO } from '../assets'
import { styles } from '../styles/Styles'

function Welcome () {
  const height = useWindowDimensions().height
  const width = useWindowDimensions().width

  const smallestDimension = (height, width) => {
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
