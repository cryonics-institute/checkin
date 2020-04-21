import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    checkinTime: state.buddy.checkinTime,
    lastAlertTime: state.buddy.lastAlertTime,
    buddyEmail: state.buddy.email,
    buddySignedIn: state.buddy.isSignedIn
  }
}

const RenderActiveAlertView = (props) => {
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

const RenderNullBuddyStatusView = (props) => {
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

const RenderSignedInBuddyView = (props) => {
  return (
    <View style = { styles.containerCentered }>
      <Text h4 style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        { moment(props.checkinTime).format('dddd, MMMM D, YYYY, h:mm A') }
      </Text>
    </View>
  )
}

const RenderSignedOutBuddyView = (props) => {
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
class Buddy extends React.Component {
  getLastAlertTime () {
    const lastAlertTime = moment(this.props.lastAlertTime).toISOString()
    const lastAlertTimeInMs =
      ((((((parseInt(lastAlertTime.slice(-13, -11), 10) * 60) +
        parseInt(lastAlertTime.slice(-10, -8), 10)) * 60) +
        parseInt(lastAlertTime.slice(-7, -5), 10)) * 1000) +
        parseInt(lastAlertTime.slice(-4, -1), 10))
    const lastAlertTimeMoment = moment()
      .startOf('date')
      .add(lastAlertTimeInMs, 'milliseconds')
      .add(moment().utcOffset(), 'minutes')

    return lastAlertTimeMoment
  }

  render () {
    if (this.props.buddySignedIn == null) {
      return (
        <RenderNullBuddyStatusView/>
      )
    } else if (this.props.buddySignedIn && !this.props.buddyAlertActive) {
      return (
        <RenderSignedInBuddyView
          checkinTime = { this.props.checkinTime }
        />
      )
    } else if (this.props.buddySignedIn && this.props.buddyAlertActive) {
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

export default connect(mapStateToProps)(Buddy)
