import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { addBuddy } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    addBuddy: (email) => dispatch(addBuddy(email))
  }
)

class BuddySelection extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      isEmailValid: false,
      emailError: ''
    }

    this.handleSignin = this.handleSignin.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }

  componentDidMount () {
    if (this.props.email !== null) {
      Promise.resolve(this.setState({ email: this.props.email }))
        .then(
          () => { this.handleSignin() },
          error => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch(error => console.log(error.message))
    }
  }

  handleSignin () {
    this.props.addBuddy(this.state.email.toLowerCase())
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
      <KeyboardAvoidingView
        behavior = 'padding'
        style = { styles.containerCentered }
      >
        <Input
          placeholder = 'Buddy&#39;s E-Mail Address'
          onChangeText = { (email) => this.validateEmail(email) }
          value = { this.state.email }
        />
        <Text style = { styles.textError }>
          { this.state.isEmailValid ? '' : this.state.emailError }
        </Text>
        <Button
          buttonStyle = { styles.button }
          disabled = { !this.state.isEmailValid }
          onPress = { () => this.handleSignin() }
          title = 'Submit'
        />
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddySelection)
