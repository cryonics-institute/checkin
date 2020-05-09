// TODO: Replace Dimensions with useWindowDimensions.
import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import { Image } from 'react-native-elements'
import { BLUE_LOGO } from '../assets'
import { styles } from '../styles/Styles'

class Welcome extends React.Component {
  smallestDimension () {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width

    if (height < width) {
      return height
    } else {
      return width
    }
  }

  render () {
    return (
      <View style = { styles.containerSpaced }>
        <Image
          source = { BLUE_LOGO }
          style = {
            {
              height: this.smallestDimension() * 0.8,
              width: this.smallestDimension() * 0.8
            }
          }
        />
        <ActivityIndicator />
      </View>
    )
  }
}

export default Welcome
