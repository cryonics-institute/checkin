// TODO: Are time-inputs children?  Do they need flow typing for children?
/**
 * Time-input component for the project, Check-In, that presents the time-input
 * with an add or remove icon in the right-hand side and validation
 * of the time.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as React from 'react'
import moment from 'moment'
import { View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { mutateInput, removeInput, setInputParameters }
  from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

type Props = {
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  mutateInput: func,
  removeInput: func,
  setInputParameters: func,
  value: string
}

type State = {
  identifier: string,
  invalid: string,
  time: string
}

const mapStateToProps = state => {
  return {
    alertTimes: state.inputs.alertTimes
  }
}

const mapDispatchToProps = dispatch => (
  {
    mutateInput: (identifier, time, validity) => dispatch(
      mutateInput(identifier, time, validity)
    ),
    removeInput: (identifier) => dispatch(removeInput(identifier)),
    setInputParameters: (height) => dispatch(setInputParameters(height))
  }
)

class TimeInput extends React.Component<Props, State> {
  constructor (props) {
    super(props)

    this.state = {
      identifier: this.props.value,
      invalid: 'Please enter as HH:MM AM/PM',
      time: ''
    }
  }

  componentDidMount () {
    if (
      this.props.alertTimes.filter(
        alert => alert.id === this.state.identifier
      )[0].validity
    ) {
      this.setState(
        {
          time: moment().isDST()
            ? moment(
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].time
            ).add(1, 'hours').format('h:mm A')
            : moment(
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].time
            ).format('h:mm A')
        }
      )
    }
  }

  // TODO: Could this use an event type?
  convertTo24Hour (time: string): string {
    const period: string = time.slice(-2).toUpperCase()
    const hour: string = parseInt(time.slice(-8, -6))

    if (period === 'AM') {
      if (hour === 12) {
        return '00'
      } else if (hour < 10) {
        return '0' + hour.toString()
      } else {
        return hour.toString()
      }
    } else {
      if (hour === 12) {
        return hour.toString()
      } else {
        return (hour + 12).toString()
      }
    }
  }

  mutate (
    event: SyntheticInputEvent<HTMLInputElement>,
    time: string
  ): void {
    const isValid: boolean = this.validate(time)

    if (isValid) {
      this.props.mutateInput(this.state.identifier, time, isValid)
    } else {
      this.props.mutateInput(this.state.identifier, '', isValid)
    }
  }

  // TODO: Could this use an event type?
  validate (time: string): boolean {
    if (!time) {
      this.setState({ invalid: 'Please enter as HH:MM AM/PM' })
      return false
    } else if (!/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/i.test(time)) {
      this.setState({ invalid: 'Please enter as HH:MM AM/PM' })
      return false
    } else {
      const hours: number = time.length > 0 ? this.convertTo24Hour(time) : 0
      const minutes: number = time.length > 0 ? time.slice(-5, -3) : 0
      const isoTime: string =
        (new Date(1970, 0, 1, hours, minutes)).toISOString()

      let isValid: boolean = true
      for (
        const alert: {| id: string, time: string, validity: boolean |}
        of this.props.alertTimes
      ) {
        if (
          moment(isoTime).isBetween(
            moment(alert.time) - 3600000,
            moment(alert.time) + 3600000,
            null,
            '()'
          )
        ) {
          this.setState(
            { invalid: 'Alerts must be at least 1 hour apart.' }
          )
          isValid = false
        }
      }

      return isValid
    }
  }

  render () {
    const length: number = this.props.alertTimes.length
    const valid: string = 'VALID'

    if (
      length > 1 &&
      this.props.alertTimes[length - 1].id !== this.state.identifier
    ) {
      return (
        <View
          key = { this.state.identifier }
          style = { styles.row }
          onLayout = {
            event => {
              this.props.setInputParameters(event.nativeEvent.layout.height)
            }
          }
        >
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].validity
                ? valid
                : this.state.invalid
            }
            errorStyle = {
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].validity
                ? styles.textTransparent
                : styles.textError
            }
            onChangeText = {
              time => {
                this.mutate(time)
                this.setState({ time: time })
              }
            }
            placeholder = 'HH:MM AM/PM'
            rightIcon = {
              <Icon
                color = { colors.dark }
                name = 'remove-circle'
                onPress = {
                  () => this.props.removeInput(this.state.identifier)
                }
                size = { 30 }
                type = 'material'
              />
            }
            value = { this.state.time }
          />
        </View>
      )
    } else {
      return (
        <View
          key = { this.state.identifier }
          style = { styles.row }
          onLayout = {
            event => {
              this.props.setInputParameters(event.nativeEvent.layout.height)
            }
          }
        >
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].validity
                ? valid
                : this.state.invalid
            }
            errorStyle = {
              this.props.alertTimes.filter(
                alert => alert.id === this.state.identifier
              )[0].validity
                ? styles.textTransparent
                : styles.textError
            }
            onChangeText = {
              time => {
                this.mutate(time)
                this.setState({ time: time })
              }
            }
            placeholder = 'HH:MM AM/PM'
            rightIcon = {
              <Icon
                color = { colors.dark }
                name = 'add-circle'
                onPress = {
                  () => this.props.mutateInput(Shortid.generate(), '', false)
                }
                size = { 30 }
                type = 'material'
              />
            }
            value = { this.state.time }
          />
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInput)
