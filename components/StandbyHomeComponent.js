// TODO: Add navigation.
import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { addPatient, signoutStandby } from '../redux/ActionCreators'
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
    addPatient: (email) => dispatch(addPatient(email)),
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
      <Text h4 style = { styles.centeredTitleTextTop }>
        The patient with e-mail
      </Text>
      <Text h4 style = { styles.centeredTitleTextMiddle }>
        { props.patientEmail }
      </Text>
      <Text h4 style = { styles.centeredTitleTextBottom }>
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
  constructor (props) {
    super(props)

    this.emailRef = React.createRef()

    this.state = {
      email: '',
      isEmailValid: false,
      emailError: ''
    }

    this.handleSignin = this.handleSignin.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }

  handleSignin () {
    this.props.addPatient(this.state.email.toLowerCase())
  }

  validateEmail (value) {
    if (!value) {
      this.setState({ emailError: 'Required' })
      this.setState({ isEmailValid: false })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      this.setState({ emailError: 'Invalid E-Mail Address' })
      this.setState({ isEmailValid: false })
    } else {
      this.setState({ isEmailValid: true })
    }

    this.setState({ email: value })
  }

  render () {
    if (this.props.patientEmail == null) {
      return (
        <View style = { styles.container }>
          <Input
            ref = { this.emailRef }
            placeholder = "Patient's E-Mail Address"
            onChangeText = { (email) => this.validateEmail(email) }
            value = { this.state.email }
          />
          <Text style = { styles.errorText }>
            { this.state.isEmailValid ? '' : this.state.emailError }
          </Text>
          <Button
            disabled = { !this.state.isEmailValid }
            onPress = { () => this.handleSignin() }
            style = { styles.button }
            title = "Submit"
          />
          <Button
            onPress = { () => this.props.signoutStandby() }
            style = { styles.button }
            title = "Sign Out"
          />
        </View>
      )
    } else {
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
}

export default connect(mapStateToProps, mapDispatchToProps)(StandbyHome)
