import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectStatus } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

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
  }

  handleStandby () {
    this.props.selectStatus(false)
    this.props.navigation.navigate('AuthLoading')
  }

  render () {
    return (
      <View style = { styles.container }>
        <Text style = { styles.title }>
          Welcome!
        </Text>
        <Button
          onPress = { () => this.handlePatient() }
          style = { styles.button }
          title = "Patient"
        />
        <Button
          onPress = { () => this.handleStandby() }
          style = { styles.button }
          title = "Standby"
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
