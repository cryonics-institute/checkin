import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { signoutStandby } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    checkinTime: state.patient.checkinTime,
    patientEmail: state.patient.email,
    patientSignedIn: state.patient.isSignedIn,
    signinTime: state.patient.signinTime
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signoutStandby: () => dispatch(signoutStandby())
  }
)

const RenderNullPatientStatusView = (props) => {
  return (
    <View style = { styles.container }>
      <Text h4 style = { styles.title }>
        Retrieving Patient Data
      </Text>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

const RenderSignedInPatientView = (props) => {
  return (
    <View style = { styles.container }>
      <Text h4 style = { styles.title }>Sign-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.signinTime)
            .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
      </Text>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.checkinTime)
            .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
      </Text>
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

const RenderSignedOutPatientView = (props) => {
  return (
    <View style = { styles.container }>
      <Text h4 style = { styles.paragraph }>
        The patient with e-mail
        {'\n'}
        { props.patientEmail }
        {'\n'}
        is not signed in.
      </Text>
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

// TODO: What happens if the network is down?
class StandbyHome extends React.Component {
  render () {
    if (this.props.patientSignedIn == null) {
      return (
        <RenderNullPatientStatusView
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    } else if (this.props.patientSignedIn) {
      return (
        <RenderSignedInPatientView
          checkinTime = { this.props.checkinTime }
          signinTime = { this.props.signinTime }
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    } else {
      return (
        <RenderSignedOutPatientView
          patientEmail = { this.props.patientEmail }
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StandbyHome)
