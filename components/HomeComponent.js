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
 * Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
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
import { hideTip, mutateInput, setSnooze } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'
import TimeInput from './TimeInputComponent'

type Props = {
  alertTimes: Array<object>,
  closeTip: func,
  hideTip: func,
  inputHeight: number,
  mutateInput: func,
  showTip: boolean
}

const mapStateToProps = state => {
  return {
    alertTimes: state.user.alertTimes,
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

function TimeInputs (props: Props) {
  const [scrollViewRef, setScrollViewRef] = React.useState(null)

  return (
    <ScrollView
      ref = { scrollView => { setScrollViewRef(scrollView) } }
      contentContainerStyle = { styles.containerScrollingContent }
      style = { styles.containerScrolling }
      onContentSizeChange = {
        (event) => {
          scrollViewRef.scrollToEnd({ animated: true })
        }
      }
    >
      {
        props.alertTimes.map(
          alert => <TimeInput
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
          <Text style = { styles.textTip }>
            <Text style = { styles.textBold }>TIP:</Text> To
            check in, enter a time using the form above.  If you
            want to add another time, just press the plus-sign for a
            new row. You can delete any check-in by pressing a
            minus-sign.
          </Text>
        </View>
      }
    </ScrollView>
  )
}

class Home extends React.Component<Props> {
  constructor (props) {
    super(props)

    this.closeTip = this.closeTip.bind(this)
  }

  componentDidMount () {
    if (this.props.alertTimes.length === 0) {
      this.props.mutateInput(Shortid.generate(), '', false)
    }
  }

  closeTip () {
    this.props.hideTip()
  }

  render () {
    return (
      <TimeInputs
        alertTimes = { this.props.alertTimes }
        inputHeight = { this.props.inputHeight }
        showTip = { this.props.showTip }
        closeTip = { this.closeTip }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
