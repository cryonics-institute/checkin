/**
 * Time-input component for the project, Cryonics Check-In, that presents the
 * time-input with an add or remove icon in the right-hand side and validation
 * of the time.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Cryonics Check-In.
 *
 * Cryonics Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Cryonics Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Cryonics Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import * as Shortid from 'shortid'
import { mutateInput, removeInput } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    inputs: state.inputs
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    mutateInput: (identifier, time, validity) => dispatch(
      mutateInput(identifier, time, validity)
    ),
    removeInput: (identifier) => dispatch(
      removeInput(identifier)
    )
  }
)

class TimeInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      identifier: this.props.value
    }
  }

  validate (time) {
    if (!time) {
      return false
    } else if (!/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/i.test(time)) {
      return false
    } else {
      return true
    }
  }

  render () {
    const length = this.props.inputs.array.length
    const valid = 'VALID'
    const invalid = 'Please enter as HH:MM AM/PM'

    if (
      length > 1 &&
      this.props.inputs.array[length - 1].id === this.state.identifier
    ) {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.textError
            }
            onChangeText = {
              time => {
                const isValid = this.validate(time)
                this.props.mutateInput(this.state.identifier, time, isValid)
              }
            }
            placeholder = 'HH:MM AM/PM'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'add-circle'
                onPress = {
                  () => this.props.mutateInput(Shortid.generate(), '', false)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    } else if (length > 1) {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.textError
            }
            onChangeText = {
              time => {
                const isValid = this.validate(time)
                this.props.mutateInput(this.state.identifier, time, isValid)
              }
            }
            placeholder = 'HH:MM AM/PM'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'remove-circle'
                onPress = {
                  () => this.props.removeInput(this.state.identifier)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    } else {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.textError
            }
            onChangeText = {
              time => {
                const isValid = this.validate(time)
                this.props.mutateInput(this.state.identifier, time, isValid)
              }
            }
            placeholder = 'HH:MM AM/PM'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'add-circle'
                onPress = {
                  () => this.props.mutateInput(Shortid.generate(), '', false)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInput)