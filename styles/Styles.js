import { Dimensions, StyleSheet } from 'react-native'

export const colors = {
  dark: 'steelblue',
  light: 'aliceblue',
  medium: 'lightsteelblue',
  error: 'firebrick'
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
      flexDirection: 'row'
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
    title: {
      margin: 5
    }
  }
)
