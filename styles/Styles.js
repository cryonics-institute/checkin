import { StyleSheet } from 'react-native'

const lightColor = 'lightsteelblue'
const darkColor = 'steelblue'

export const styles = StyleSheet.create(
  {
    button: {
      backgroundColor: 'steelblue',
      margin: 5
    },
    buttonTitleClear: {
      color: darkColor
    },
    containerCentered: {
      alignItems: 'center',
      backgroundColor: lightColor,
      flex: 1,
      justifyContent: 'center'
    },
    containerSpaced: {
      alignItems: 'center',
      backgroundColor: lightColor,
      flex: 1,
      justifyContent: 'space-evenly'
    },
    header: {
      backgroundColor: darkColor,
      color: 'white'
    },
    paragraph: {
      margin: 5,
      textAlign: 'center'
    },
    slider: {
      margin: 5,
      width: '75%'
    },
    text: {
      margin: 5
    },
    textError: {
      color: 'firebrick',
      fontSize: 12,
      margin: 5
    },
    title: {
      margin: 5
    }
  }
)
