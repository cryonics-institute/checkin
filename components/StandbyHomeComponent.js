import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    checkinTime: state.patient.checkinTime,
    lastAlertTime: state.patient.lastAlertTime,
    patientEmail: state.patient.email,
    patientAlertActive: state.patient.isAlertActive,
    patientSignedIn: state.patient.isSignedIn,
    signinTime: state.patient.signinTime
  }
}

const RenderActiveAlertView = (props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h1 style = { styles.title }>ALERT</Text>
      <Text style = { styles.paragraph }>
        The member should have checked in at{'\n'}
        { props.lastAlertTime.format('h:mm A dddd') }.
      </Text>
      <Text h4 style = { styles.title }>Sign-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.signinTime)
            .format('dddd, MMMM D, YYYY, h:mm A')
        }
      </Text>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.checkinTime)
            .format('dddd, MMMM D, YYYY, h:mm A')
        }
      </Text>
    </View>
  )
}

const RenderNullPatientStatusView = (props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.title }>
        Retrieving Patient Data
      </Text>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  )
}

const RenderSignedInPatientView = (props) => {
  return (
    <View style = { styles.containerCentered }>
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
    </View>
  )
}

const RenderSignedOutPatientView = (props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.paragraph }>
        The patient with e-mail
        {'\n'}
        { props.patientEmail }
        {'\n'}
        is not signed in.
      </Text>
    </View>
  )
}

// TODO: What happens if the network is down?
class StandbyHome extends React.Component {
  render () {
    if (this.props.patientSignedIn == null) {
      return (
        <RenderNullPatientStatusView/>
      )
    } else if (this.props.patientSignedIn && !this.props.patientAlertActive) {
      return (
        <RenderSignedInPatientView
          checkinTime = { this.props.checkinTime }
          signinTime = { this.props.signinTime }
        />
      )
    } else if (this.props.patientSignedIn && this.props.patientAlertActive) {
      return (
        <RenderActiveAlertView
          checkinTime = { this.props.checkinTime }
          lastAlertTime = { this.props.lastAlertTime }
          signinTime = { this.props.signinTime }
        />
      )
    } else {
      return (
        <RenderSignedOutPatientView
          patientEmail = { this.props.patientEmail }
        />
      )
    }
  }
}

export default connect(mapStateToProps)(StandbyHome)