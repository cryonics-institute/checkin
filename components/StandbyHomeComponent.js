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

// TODO: What happens if the network is down?
class StandbyHome extends React.Component {
  render () {
    if (this.props.isPatientSignedIn == null) {
      return (
        <View style = { styles.container }>
          <Text style = { styles.title }>
            Retrieving Patient Data
          </Text>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
          <Button
            onPress = { () => this.props.signoutStandby() }
            style = { styles.button }
            title = "Sign Out"
          />
        </View>
      )
    } else if (this.props.isPatientSignedIn) {
      return (
        <View style = { styles.container }>
          <Text style = { styles.title }>Sign-In Time</Text>
          <Text style = { styles.text }>
            {
              moment(this.props.signinTime)
                .format('dddd, MMMM Do YYYY, h:mm:ss a')
            }
          </Text>
          <Text style = { styles.title }>Check-In Time</Text>
          <Text style = { styles.text }>
            {
              moment(this.props.checkinTime)
                .format('dddd, MMMM Do YYYY, h:mm:ss a')
            }
          </Text>
          <Button
            onPress = { () => this.props.signoutStandby() }
            style = { styles.button }
            title = "Sign Out"
          />
        </View>
      )
    } else {
      return (
        <View style = { styles.container }>
          <Text style = { styles.title }>
            The patient is not signed in.
          </Text>
          <Button
            onPress = { () => this.props.signoutStandby() }
            style = { styles.button }
            title = "Sign Out"
          />
        </View>
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
