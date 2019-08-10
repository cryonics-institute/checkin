import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View }
  from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { getDocument, signoutStandby } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    checkinTime: state.document.checkinTime,
    isPatientSignedIn: state.document.isPatientSignedIn,
    signinTime: state.document.signinTime
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getDocument: () => dispatch(getDocument()),
    signoutStandby: () => dispatch(signoutStandby())
  }
)

const RenderNullPatientStatusView = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.title }>
        Retrieving Patient Data
      </Text>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

const RenderSignedInPatientView = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.title }>Sign-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.signinTime)
            .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
      </Text>
      <Text style = { styles.title }>Check-In Time</Text>
      <Text style = { styles.text }>
        {
          moment(props.checkinTime)
            .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
      </Text>
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

const RenderSignedOutPatientView = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.title }>
        The patient is not signed in.
      </Text>
      <Button
        onPress = { () => props.signoutStandby() }
        style = { styles.button }
        title = "Sign Out"
      />
    </View>
  )
}

// TODO: What happens if the network is down?
class StandbyHome extends React.Component {
  render () {
    if (this.props.isPatientSignedIn == null) {
      return (
        <RenderNullPatientStatusView
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    } else if (this.props.isPatientSignedIn) {
      return (
        <RenderSignedInPatientView
          signinTime = { this.props.signinTime }
          checkinTime = { this.props.checkinTime }
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    } else {
      return (
        <RenderSignedOutPatientView
          signoutStandby = { () => this.props.signoutStandby() }
        />
      )
    }
  }
}

const styles = StyleSheet.create(
  {
    button: {
      margin: 5
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    text: {
      margin: 5
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 5
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StandbyHome)
