import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    checkinTime: state.patient.checkinTime,
    patientEmail: state.patient.email,
    patientSignedIn: state.patient.isSignedIn,
    signinTime: state.patient.signinTime
  }
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
          format(props.signinTime, 'dddd, MMMM Do YYYY, h:mm:ss a')
        }
      </Text>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        {
          format(props.checkinTime, 'dddd, MMMM Do YYYY, h:mm:ss a')
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
    } else if (this.props.patientSignedIn) {
      return (
        <RenderSignedInPatientView
          checkinTime = { this.props.checkinTime }
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
