// TODO: Navigate to buddy tab when buddy is added.
// TODO: Move loading buddy from memory up the stack to at least the main view
// if not App.js.
import React from 'react'
import { KeyboardAvoidingView, Platform, View, useWindowDimensions }
  from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderHeightContext } from '@react-navigation/stack'
import { addBuddy } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => (
  {
    addBuddy: (email) => dispatch(addBuddy(email))
  }
)

function BuddySelectionView (props) {
  const windowHeight = useWindowDimensions().height

  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View
            style = {
              {
                backgroundColor: colors.light,
                height: windowHeight - (headerHeight * 2)
              }
            }
          >
            <KeyboardAvoidingView
              behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
              style = { styles.containerCentered }
            >
              <Input
                placeholder = 'Buddy&#39;s E-Mail Address'
                onChangeText = { email => props.validateEmail(email) }
                value = { props.email }
              />
              <Text style = { styles.textError }>
                { props.isEmailValid ? '' : props.emailError }
              </Text>
              <Button
                buttonStyle = { styles.button }
                disabled = { !props.isEmailValid }
                onPress = { () => props.handlePress() }
                title = 'Submit'
              />
            </KeyboardAvoidingView>
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  )
}

class BuddySelection extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      isEmailValid: false,
      emailError: ''
    }
  }

  componentDidMount () {
    if (this.props.email !== null) {
      Promise.resolve(this.setState({ email: this.props.email }))
        .then(
          () => { this.props.addBuddy(this.state.email.toLowerCase()) },
          error => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch(error => console.log(error.message))
    }
  }

  handlePress () {
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
      <BuddySelectionView
        email = { this.state.email }
        isEmailValid = { this.state.isEmailValid }
        emailError = { this.state.emailError }
        handlePress = { () => this.handlePress() }
        validateEmail = { username => this.validateEmail(username) }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddySelection)
