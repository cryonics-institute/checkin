import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { checkin, signoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth,
    timer: state.timer
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    checkin: () => dispatch(checkin()),
    signoutUser: () => dispatch(signoutUser())
  }
)

class Home extends React.Component {
  handleCheckin () {
    this.props.checkin(this.props.timer)
  }

  handleSignout () {
    this.props.signoutUser(this.props.timer)
  }

  render () {
    return (
      <View style = { styles.container }>
        <Text>Home Screen</Text>
        <Button
          onPress = { () => this.handleCheckin() }
          title = "Check-In"
        />
        <Button
          onPress = { () => this.handleSignout() }
          title = "Sign Out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
