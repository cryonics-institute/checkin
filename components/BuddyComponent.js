/**
 * Buddy-tab component for the project, Check-In, that presents the view with
 * which the user checks information about buddies.
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
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { setListener } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'

type Props = {
  buddyAlertActive: boolean,
  buddyEmail: string,
  buddyIsAdded: boolean,
  checkinTime: string,
  lastAlertTime: string,
  setListener: func
}

const mapStateToProps = state => {
  return {
    checkinTime: state.buddy.checkinTime,
    lastAlertTime: state.buddy.lastAlertTime,
    buddyEmail: state.buddy.email,
    buddyIsAdded: state.buddy.isAdded
  }
}

const mapDispatchToProps = dispatch => (
  { setListener: (email) => dispatch(setListener(email)) }
)

const RenderActiveAlertView = (props: Props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h1 style = { styles.title }>ALERT</Text>
      <Text style = { styles.paragraph }>
        The member should have {'\n'}
        checked in at { moment(props.lastAlertTime).format('h:mm A') }.
      </Text>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        { moment(props.checkinTime).format('dddd, MMMM D, YYYY, h:mm A') }
      </Text>
    </View>
  )
}

const RenderNullBuddyStatusView = () => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.title }>
        Retrieving Buddy Data
      </Text>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  )
}

const RenderSignedInBuddyView = (props: Props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        { moment(props.checkinTime).format('dddd, MMMM D, YYYY, h:mm A') }
      </Text>
    </View>
  )
}

const RenderSignedOutBuddyView = (props: Props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.paragraph }>
        The buddy with e-mail
        {'\n'}
        { props.buddyEmail }
        {'\n'}
        is not signed in.
      </Text>
    </View>
  )
}

// TODO: What happens if the network is down?
class Buddy extends React.Component<Props> {
  componentDidMount () {
    if (this.props.buddyEmail !== null) {
      this.props.setListener(this.props.buddyEmail)
    }
  }

  getLastAlertTime (): string {
    const lastAlertTime: string = moment(this.props.lastAlertTime).toISOString()
    const lastAlertTimeInMs: number =
      ((((((parseInt(lastAlertTime.slice(-13, -11), 10) * 60) +
        parseInt(lastAlertTime.slice(-10, -8), 10)) * 60) +
        parseInt(lastAlertTime.slice(-7, -5), 10)) * 1000) +
        parseInt(lastAlertTime.slice(-4, -1), 10))
    const lastAlertTimeMoment: string = moment()
      .startOf('date')
      .add(lastAlertTimeInMs, 'milliseconds')
      .add(moment().utcOffset(), 'minutes')

    return lastAlertTimeMoment
  }

  render () {
    if (this.props.buddyIsAdded == null) {
      return (
        <RenderNullBuddyStatusView/>
      )
    } else if (this.props.buddyIsAdded && !this.props.buddyAlertActive) {
      return (
        <RenderSignedInBuddyView
          checkinTime = { this.props.checkinTime }
        />
      )
    } else if (this.props.buddyIsAdded && this.props.buddyAlertActive) {
      return (
        <RenderActiveAlertView
          checkinTime = { this.props.checkinTime }
          lastAlertTime = { this.getLastAlertTime() }
        />
      )
    } else {
      return (
        <RenderSignedOutBuddyView
          buddyEmail = { this.props.buddyEmail }
        />
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buddy)
