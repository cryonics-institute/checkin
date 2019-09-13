import React from 'react'
import { ScrollView, View } from 'react-native'
import { Icon, Input, Slider, Text, Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'
import * as shortid from 'shortid'
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

    this.timeRef = React.createRef()

    this.state = {
      interval: this.props.timer.interval,
      areTimesValid: [],
      timeErrors: [],
      timeInputs: [],
      times: []
    }

    this.addTimeInput = this.addTimeInput.bind(this)
    this.handleIntervalChange = this.handleIntervalChange.bind(this)
    this.validateTime = this.validateTime.bind(this)
  }

  componentDidMount () {
    this.addTimeInput()
  }

  addTimeInput () {
    const identifier = shortid.generate()
    const timeInputs = this.state.timeInputs
    const times = this.state.times

    timeInputs.push(
      <View key = { identifier }>
        <View style = { styles.timeRow }>
          <Input
            placeholder = 'HH:MM AM/PM'
            onChangeText = {
              value => {
                times[identifier] = value
                console.log('TIME ' + identifier + ': ' + times[identifier])
              }
            }
          />
          <Icon
            color = { colors.dark }
            name = 'add-circle'
            onPress = { () => this.addTimeInput() }
            type = 'material'
          />
          <Icon
            color = { colors.dark }
            name = 'remove-circle'
            onPress = {
              () => {
                if (this.state.timeInputs.length > 1) {
                  this.removeTimeInput(identifier)
                } else {
                  console.log('LENGTH: ' + this.state.timeInputs.length)
                }
              }
            }
            type = 'material'
          />
        </View>
      </View>
    )

    this.setState({ timeInputs: timeInputs })
    this.setState({ times: times })
  }

  removeTimeInput (key) {
    // const areTimesValid = this.state.areTimesValid.filter(
    //   isTimeValid => isTimeValid.key !== key
    // )
    // const timeErrors = this.state.timeErrors.filter(
    //   timeError => timeError.key !== key
    // )
    const timeInputs = this.state.timeInputs.filter(
      timeInput => timeInput.key !== key
    )
    const times = this.state.times.filter(time => time.key !== key)
    this.setState(
      {
        // areTimesValid: areTimesValid,
        // timeErrors: timeErrors,
        timeInputs: timeInputs,
        times: times
      }
    )
  }

  handleIntervalChange () {
    this.props.removeTimers()
    this.props.setTimer(this.state.interval)
  }

  validateTime (time, index) {
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
        {
          this.state.timeInputs.map(
            (value) => { return value }
          )
        }
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
