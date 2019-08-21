import React from 'react'
import { View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { addPatient, signoutStandby } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    // Nothing in state is relevant here.
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    addPatient: (email) => dispatch(addPatient(email)),
    signoutStandby: () => dispatch(signoutStandby())
  }
)

class StandbyPatientSelection extends React.Component {
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
    return (
      <View style = { styles.container }>
        <Input
          ref = { this.emailRef }
          placeholder = "Patient's E-Mail Address"
          onChangeText = { (email) => this.validateEmail(email) }
          value = { this.state.email }
        />
        <Text style = { styles.textError }>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StandbyPatientSelection)
