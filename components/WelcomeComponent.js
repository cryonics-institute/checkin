import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { BLUE_LOGO } from '../assets'
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

  // componentDidMount () {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.navigation.navigate('App')
  //   } else if (this.props.auth.isPatient != null) {
  //     this.props.navigation.navigate('Auth')
  //   }
  // }

  handlePatient () {
    this.props.selectStatus(true)
    this.props.navigation.navigate('PatientAuth')
  }

  handleStandby () {
    this.props.selectStatus(false)
    this.props.navigation.navigate('StandbyAuth')
  }

  render () {
    return (
      <View style = { styles.containerSpaced }>
        <View>
          <Image
            PlaceholderContent = { <ActivityIndicator/> }
            resizeMode = 'contain'
            source = { BLUE_LOGO }
          />
        </View>
        <View>
          <Button
            onPress = { () => this.handlePatient() }
            style = { styles.button }
            title = "Check In Myself"
          />
          <Button
            onPress = { () => this.handleStandby() }
            style = { styles.button }
            title = "Check On Somebody"
          />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
