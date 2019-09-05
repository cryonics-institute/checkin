import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Slider, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { removeTimers, setTimer } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    removeTimers: () => dispatch(removeTimers()),
    setTimer: interval => dispatch(setTimer(interval))
  }
)

class PatientHome extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: this.props.timer.interval
    }

    this.handleIntervalChange = this.handleIntervalChange.bind(this)
  }

  handleIntervalChange (value) {
    this.props.removeTimers()
    this.props.setTimer(this.state.interval)
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior = 'padding'
        style = { styles.containerCentered }
      >
        <Text h4 style = { styles.title }>Check-In Interval</Text>
        <Slider
          maximumValue = { this.props.timer.maximumInterval }
          minimumValue = { this.props.timer.minimumInterval }
          onSlidingComplete = { value => this.handleIntervalChange(value) }
          onValueChange = { value => this.setState({ interval: value }) }
          step = { 1000 }
          style = { styles.slider }
          value = { this.props.timer.interval }
        />
        <Text style = { styles.text }>
          { this.state.interval / 1000 } Seconds
        </Text>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
