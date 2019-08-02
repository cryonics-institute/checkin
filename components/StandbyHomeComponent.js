import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'
import { getDocument, signoutStandby } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    signinTime: state.signinTime,
    checkinTime: state.checkinTime
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getDocument: () => dispatch(getDocument()),
    signoutStandby: () => dispatch(signoutStandby())
  }
)

class StandbyHome extends React.Component {
  componentDidMount () {
    this.props.getDocument()
      .then(
        () => {
          const signinTime =
            moment(this.props.signinTime)
              .format('dddd, MMMM Do YYYY, h:mm:ss a')
          const checkinTime =
            moment(this.props.checkinTime)
              .format('dddd, MMMM Do YYYY, h:mm:ss a')
          console.log('SIGNIN TIME: ' + signinTime)
          console.log('CHECKIN TIME: ' + checkinTime)
        }
      )
  }

  render () {
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
