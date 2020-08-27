// TODO: App should not reset snooze back to 9 minutes when relaunching.

/**
 * Home-tab component for the project, Check-In, that presents the view with
 * which the user adds, edits, and deletes times to check in.
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
import { ScrollView, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { hideTip, mutateInput, setSnooze } from '../redux/ActionThunks'
import { colors, styles } from '../styles/Styles'
import TimeInput from './TimeInputComponent'

type ComponentProps = {
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  inputHeight: number,
  showTip: boolean,
  hideTip: () => void,
  mutateInput: (identifier: string, text: string, validity: boolean) => void,
  setSnooze: (snooze: number) => void
}

type ViewProps = {
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  showTip: boolean,
  closeTip: () => void
}

const mapStateToProps = state => {
  return {
    alertTimes: state.inputs.alertTimes,
    inputHeight: state.inputs.height,
    showTip: state.inputs.showTip
  }
}

const mapDispatchToProps = dispatch => (
  {
    hideTip: () => dispatch(hideTip()),
    mutateInput: (identifier, text, validity) => dispatch(
      mutateInput(identifier, text, validity)
    ),
    setSnooze: snooze => dispatch(setSnooze(snooze))
  }
)

function TimeInputs (props: ViewProps) {
  const [
    scrollViewRef: (typeof ScrollView | null),
    setScrollViewRef: (scrollView: (typeof ScrollView)) => void
  ] = React.useState(null)

  return (
    <ScrollView
      ref = { scrollView => { setScrollViewRef(scrollView) } }
      contentContainerStyle = { styles.containerScrollingContent }
      style = { styles.containerScrolling }
      onContentSizeChange = {
        () => {
          typeof scrollViewRef === 'undefined' || scrollViewRef === null
            ? console.log('Scroll-view component is loading.')
            : scrollViewRef.scrollToEnd({ animated: true })
        }
      }
    >
      {
        props.alertTimes.map(
          (
            alert: {| id: string, time: string, validity: boolean |}
          ) => <TimeInput
            key = { alert.id.toString() }
            value = { alert.id }
          />
        )
      }
      {
        props.showTip &&
        <View
          style = { styles.containerRounded }
        >
          <Icon
            color = { colors.dark }
            containerStyle = { styles.buttonTopRight }
            name = 'cancel'
            onPress = { props.closeTip() }
            type = 'material'
          />
          <Text>
            <Text style = { styles.textTipBold }>TIP: </Text>
            <Text style = { styles.textTip }>
              To check in, enter a time using the form above.  If you want to
              add another time, just press the plus-sign for a new row. You can
              delete any check-in by pressing a minus-sign.
            </Text>
          </Text>
        </View>
      }
    </ScrollView>
  )
}

class Home extends React.Component<ComponentProps> {
  componentDidMount () {
    if (this.props.alertTimes.length === 0) {
      this.props.mutateInput(Shortid.generate(), '', false)
    }
  }

  closeTip (): void {
    this.props.hideTip()
  }

  render () {
    return (
      <TimeInputs
        alertTimes = { this.props.alertTimes }
        inputHeight = { this.props.inputHeight }
        showTip = { this.props.showTip }
        closeTip = { this.closeTip.bind(this) }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
