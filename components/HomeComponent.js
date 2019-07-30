import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Slider } from 'react-native-elements'
import { connect } from 'react-redux'
import { setTimerInterval, signoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    setTimerInterval: (interval) => dispatch(setTimerInterval(interval)),
    signoutUser: () => dispatch(signoutUser())
  }
)

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: this.props.timer.interval
    }
  }

  handleIntervalChange (value) {
    this.setState({ interval: value })
    this.props.setTimerInterval(this.state.interval)
  }

  render () {
    return (
      <View style = { styles.container }>
        <Text style = { styles.title }>Check-In Interval</Text>
        <Slider
          maximumValue = { 10000 }
          minimumValue = { 0 }
          onValueChange = { value => this.handleIntervalChange(value) }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
