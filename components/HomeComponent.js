// TODO: App should not reset snooze back to 9 minutes when relaunching.
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
import { ScrollView, View, useWindowDimensions } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { HeaderHeightContext } from '@react-navigation/stack'
import { hideTip, mutateInput, setSnooze } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'
import TimeInput from './TimeInputComponent'

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

function TimeInputs (props) {
  const [scrollViewRef, setScrollViewRef] = React.useState(null)
  const [tipHeight, setTipHeight] = React.useState(null)
  const windowHeight = useWindowDimensions().height

  const calculateHeight = (
    showTip,
    numberOfInputs,
    headerHeight,
    inputHeight,
    tipHeight,
    windowHeight
  ) => {
    if (showTip) {
      return inputHeight * numberOfInputs > windowHeight
        ? 0
        : (
          windowHeight -
          (inputHeight * numberOfInputs) -
          (headerHeight * 2) -
          tipHeight
        ) / 2
    } else {
      return inputHeight * numberOfInputs > windowHeight
        ? 0
        : (
          windowHeight -
          (inputHeight * numberOfInputs) -
          (headerHeight * 2)
        ) / 2
    }
  }

  return (
    <HeaderHeightContext.Consumer>
      {
        headerHeight => (
          <View
            style = {
              {
                backgroundColor: colors.dark,
                flex: 1
              }
            }
          >
            <ScrollView
              ref = { scrollView => { setScrollViewRef(scrollView) } }
              contentContainerStyle = { styles.containerCentered }
              style = { styles.containerScrolling }
              onContentSizeChange = {
                (event) => {
                  scrollViewRef.scrollToEnd({ animated: true })
                }
              }
            >
              {
                props.alertTimes.map(
                  (alert, i) => i === 0
                    ? <View key = { i }>
                      <View
                        style = {
                          {
                            height: calculateHeight(
                              props.showTip,
                              props.alertTimes.length,
                              headerHeight,
                              props.inputHeight,
                              tipHeight,
                              windowHeight
                            )
                          }
                        }
                      >
                      </View>
                      <TimeInput
                        key = { alert.id.toString() }
                        value = { alert.id }
                      />
                    </View>
                    : <View key = { i }>
                      <TimeInput
                        key = { alert.id.toString() }
                        value = { alert.id }
                      />
                    </View>
                )
              }
              {
                props.showTip &&
                <View
                  style = { styles.containerRounded }
                  onLayout = {
                    (event) => {
                      setTipHeight(
                        event.nativeEvent.layout.height
                      )
                    }
                  }
                >
                  <Icon
                    color = { colors.dark }
                    containerStyle = { styles.buttonTopRight }
                    name = 'cancel'
                    onPress = { props.closeTip() }
                    type = 'material'
                  />
                  <Text style = { styles.textTip }>
                    <Text style = { { fontWeight: 'bold' } }>TIP:</Text> To
                    check in, enter a time using the form above.  If you
                    want to add another time, just press the plus-sign for a
                    new row. You can delete any check-in by pressing a
                    minus-sign.
                  </Text>
                </View>
              }
            </ScrollView>
          </View>
        )
      }
    </HeaderHeightContext.Consumer>
  )
}

class Home extends React.Component {
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

// class Home extends React.Component {
//   componentDidMount () {
//     if (this.props.alertTimes.length === 0) {
//       this.props.mutateInput(Shortid.generate(), '', false)
//     }
//   }
//
//   render () {
//     return (
//       <ScrollView contentContainerStyle = { styles.containerCentered }>
//         <Text h4 style = { styles.title }>Check-In Times</Text>
//         {
//           this.props.alertTimes.map(
//             alert => <TimeInput
//               key = { alert.id.toString() }
//               value = { alert.id }
//             />
//           )
//         }
//         <View style = { styles.tooltip }>
//           <Text h4 style = { styles.title }>
//             Snooze Interval
//           </Text>
//           <Tooltip
//             height = { 80 }
//             backgroundColor = { colors.medium }
//             popover = {
//               <Text>
//                 How long would you like to wait before your buddy is contacted
//                 if you miss a check-in?
//               </Text>
//             }
//             width = { 222 }
//           >
//             <Icon
//               color = { colors.dark }
//               name = 'info'
//               type = 'material'
//             />
//           </Tooltip>
//         </View>
//         <Slider
//           maximumValue = { this.props.user.shortestInterval / 60000 }
//           minimumValue = { 1 }
//           onSlidingComplete = { value => this.props.setSnooze(value) }
//           step = { 1 }
//           style = { styles.slider }
//           value = { this.props.user.snooze }
//         />
//         <Text style = { styles.text }>
//           {
//             this.props.user.snooze === 1
//               ? this.props.user.snooze + ' Minute'
//               : this.props.user.snooze + ' Minutes'
//           }
//         </Text>
//       </ScrollView>
//     )
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
