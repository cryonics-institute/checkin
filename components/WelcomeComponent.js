import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Image } from 'react-native-elements'
import { BLUE_LOGO } from '../assets'
import { styles } from '../styles/Styles'

class Welcome extends React.Component {
  render () {
    return (
      <View style = { styles.containerSpaced }>
        <Image
          resizeMode = 'contain'
          source = { BLUE_LOGO }
          style = { styles.image }
        />
        <ActivityIndicator />
      </View>
    )
  }
}

export default Welcome
