import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

class Home extends React.Component {
  componentDidMount () {
    this.props.auth.isPatient
      ? this.props.navigation.navigate('PatientHome')
      : this.props.navigation.navigate('StandbyHome')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style = { styles.container }>
        <Text h3 style = { styles.title }>Home</Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default connect(mapStateToProps)(Home)
