import React from 'react'
import { ScrollView, View } from 'react-native'
import { Icon, Slider, Text, Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'
import { removeTimers, setTimer } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

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

  handleIntervalChange () {
    this.props.removeTimers()
    this.props.setTimer(this.state.interval)
  }

  render () {
    return (
      <ScrollView contentContainerStyle = { { alignItems: 'center' } }>
        <Text h4 style = { styles.title }>Check-In Interval</Text>
        <Slider
          maximumValue = { this.props.timer.maximumInterval }
          minimumValue = { this.props.timer.minimumInterval }
          onSlidingComplete = { () => this.handleIntervalChange() }
          onValueChange = { value => this.setState({ interval: value }) }
          step = { 1000 }
          style = { styles.slider }
          value = { this.props.timer.interval }
        />
        <View style = { styles.row }>
          <Text style = { styles.text }>
            { this.state.interval / 1000 }
          </Text>
          <Text style = { styles.textStrikeThrough }>
             Hours
          </Text>
          <Text style = { styles.text }>
             Seconds
          </Text>
        </View>
        <View style = { styles.row }>
          <Tooltip
            height = { 80 }
            backgroundColor = { colors.medium }
            popover = {
              <Text>
                How long would you like to wait before your buddy is contacted
                if you miss a check-in?
              </Text>
            }
            width = { 222 }
          >
            <Text h4 style = { styles.title }>
              Snooze Interval
            </Text>
          </Tooltip>
          <Tooltip
            height = { 80 }
            backgroundColor = { colors.medium }
            popover = {
              <Text>
                How long would you like to wait before your buddy is contacted
                if you miss a check-in?
              </Text>
            }
            width = { 222 }
          >
            <Icon
              color = { colors.dark }
              name = 'info'
              type = 'material'
            />
          </Tooltip>
        </View>
        <Slider
          maximumValue = { this.props.timer.maximumInterval }
          minimumValue = { this.props.timer.minimumInterval }
          step = { 1000 }
          style = { styles.slider }
        />
        <Text style = { styles.text }>
          { this.state.interval / 1000 } Seconds // TODO: Change this!
        </Text>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
