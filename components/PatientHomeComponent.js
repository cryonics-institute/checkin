/**
 * Main component for the project, Dynamic Text-Input for React Native, that
 * presents the view inside of which the text-input components are presented.
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

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Icon, Slider, Text, Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { mutateInput } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'
import TimeInput from './TimeInputComponent'

const mapStateToProps = state => {
  return {
    patient: state.patient,
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    mutateInput: (identifier, text, validity) => dispatch(
      mutateInput(identifier, text, validity)
    )
  }
)

class PatientHome extends React.Component {
  componentDidMount () {
    if (this.props.patient.alertTimes.length === 0) {
      this.props.mutateInput(Shortid.generate(), '', false)
    }
  }

  render () {
    return (
      <ScrollView contentContainerStyle = { styles.containerCentered }>
        <Text h4 style = { styles.title }>Time Inputs</Text>
        {
          this.props.patient.alertTimes.map(
            alert => <TimeInput
              key = { alert.id.toString() }
              value = { alert.id }
            />
          )
        }
        <View style = { styles.tooltip }>
          <Text h4 style = { styles.title }>
            Snooze Interval
          </Text>
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
          { 15 } Minutes // TODO: Change this!
        </Text>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome)
