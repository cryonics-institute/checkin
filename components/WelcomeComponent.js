import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectStatus } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    selectStatus: (isPatient) => dispatch(selectStatus(isPatient))
  }
)

class Welcome extends React.Component {
  constructor (props) {
    super(props)

    this.handlePatient = this.handlePatient.bind(this)
    this.handleStandby = this.handleStandby.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('App')
    } else if (this.props.auth.isPatient != null) {
      this.props.navigation.navigate('Auth')
    }
  }

  handlePatient () {
    this.props.selectStatus(true)
    this.props.navigation.navigate('AuthLoading')
    console.log(this.props.auth.isPatient)
  }

  handleStandby () {
    this.props.selectStatus(false)
    this.props.navigation.navigate('AuthLoading')
    console.log(this.props.auth.isPatient)
  }

  render () {
    return (
      <View style = { styles.container }>
        <Text style = { styles.title }>
          Welcome!
        </Text>
        <Button
          title = "Patient"
          onPress = { () => this.handlePatient() }
          style = { styles.button }
        />
        <Button
          title = "Standby"
          onPress = { () => this.handleStandby() }
          style = { styles.button }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    button: {
      margin: 5
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 5
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
