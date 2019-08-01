import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Slider } from 'react-native-elements'
import { connect } from 'react-redux'
import { removeTimers, setTimer, signoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    removeTimers: () => dispatch(removeTimers()),
    setTimer: interval => dispatch(setTimer(interval)),
    signoutUser: () => dispatch(signoutUser())
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
          maximumValue = { 10000 }
          minimumValue = { 1000 }
          onSlidingComplete = { value => this.handleIntervalChange(value) }
          onValueChange = { value => this.setState({ interval: value }) }
          step = { 1000 }
          style = { styles.slider }
          value = { this.props.timer.interval }
        />
        <Text>{ this.state.interval }</Text>
        <Button
          onPress = { () => this.props.signoutUser() }
          title = "Sign Out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    slider: {
      width: 100
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
