import React from 'react'
import { ScrollView, View } from 'react-native'
import { Icon, Input, Slider, Text, Tooltip } from 'react-native-elements'
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

const RenderTimeInput = (props) => {
  return (
    <View>
      <View style = { styles.timeRow }>
        <Input
          ref = { props.timeRef }
          placeholder = 'HH:MM AM/PM'
          onChangeText = { value => props.validateTime(value) }
          value = { props.time }
        />
        <Icon
          color = { colors.dark }
          name = 'add-circle'
          onPress = { () => props.addTimeInput(props.timeInput.length) }
          type = 'material'
        />
      </View>
      <View style = { styles.row }>
        <Text style = { styles.textError }>
          { props.isTimeValid ? '' : props.timeError }
        </Text>
      </View>
    </View>
  )
}

class PatientHome extends React.Component {
  constructor (props) {
    super(props)

    this.timeRef = React.createRef()

    this.state = {
      interval: this.props.timer.interval,
      isTimeValid: false,
      time: '',
      timeError: '',
      timeInput: []
    }

    this.addTimeInput = this.addTimeInput.bind(this)
    this.handleIntervalChange = this.handleIntervalChange.bind(this)
    this.validateTime = this.validateTime.bind(this)
  }

  componentDidMount () {
    this.addTimeInput(0)
  }

  addTimeInput (key) {
    const timeInput = this.state.timeInput
    timeInput.push(
      <RenderTimeInput
        key = { key }
        time = { this.state.time }
        timeRef = { this.timeRef }
        validateTime = { time => this.validateTime(time) }
        isTimeValid = { this.state.isTimeValid }
        timeError = { this.state.timeError }
        timeInput = { this.state.timeInput }
        addTimeInput = { input => this.addTimeInput(input) }
      />
    )
    this.setState({ timeInput })
  }

  handleIntervalChange (value) {
    this.props.removeTimers()
    this.props.setTimer(this.state.interval)
  }

  validateTime (time) {
    if (!time) {
      this.setState({ timeError: 'Required' })
      this.setState({ isTimeValid: false })
    } else if (!/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/i.test(time)) {
      this.setState({ timeError: 'Invalid Time' })
      this.setState({ isTimeValid: false })
    } else {
      this.setState({ isTimeValid: true })
    }

    this.setState({ time: time })
  }

  render () {
    return (
      <ScrollView contentContainerStyle = { { alignItems: 'center' } }>
        { this.state.timeInput.map((value, index) => { return value }) }
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
