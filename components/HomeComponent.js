import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { signoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signoutUser: () => dispatch(signoutUser())
  }
)

class Home extends React.Component {
  handleSignout () {
    this.props.signoutUser()
  }

  render () {
    return (
      <View style = { styles.container }>
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
