import React from 'react'
import { Text, View } from 'react-native'
import { Button, Slider } from 'react-native-elements'
import { connect } from 'react-redux'
import { removeTimers, setTimer, signoutPatient } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    removeTimers: () => dispatch(removeTimers()),
    setTimer: interval => dispatch(setTimer(interval)),
    signoutPatient: () => dispatch(signoutPatient())
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
      <View style = { styles.container }>
        <Text style = { styles.title }>Check-In Interval</Text>
        <Slider
          maximumValue = { this.props.timer.maximumInterval }
          minimumValue = { this.props.timer.minimumInterval }
          onSlidingComplete = { value => this.handleIntervalChange(value) }
          onValueChange = { value => this.setState({ interval: value }) }
          step = { 1000 }
          style = { styles.slider }
          value = { this.props.timer.interval }
        />
        <Text>{ this.state.interval }</Text>
        <Button
          onPress = { () => this.props.signoutPatient() }
          style = { styles.button }
          title = "Sign Out"
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
